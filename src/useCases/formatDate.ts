import { ConfigurationsFormat, OutputFormat } from "../interfaceAdapters/models"
import { ExceptionDateFormating, HttpStatusCode } from "../interfaceAdapters/errorHandling"

export class FormatDate {
  

  /**
   * 
   * @param outputObject output object to be formatted
   * @param configMap configurations map for the specific input case
   * 
   * @returns the output object with the date formatted in specific way
   */
  formatDate(outputObject: OutputFormat, configMap: ConfigurationsFormat): OutputFormat{
    try {
      const date = this.parseDatesByString(outputObject, configMap)
      const objectWithDateFormatted: OutputFormat = {
          newOrder: {
              ...outputObject.newOrder,
              created: date
          }
      }
      return objectWithDateFormatted
    } catch(error) {
      if (error instanceof ExceptionDateFormating) {
        throw error
      } else {
        throw new ExceptionDateFormating(HttpStatusCode.INTERNAL_SERVER, 'Error formatting date')
      }
    }
  }

  /**
   * 
   * @param outputObject output object to be formatted
   * @param configMap @param configMap configurations map for the specific input case
   * @returns date formatted in specific way as required by the case
   */
  parseDatesByString(outputObject: OutputFormat, configMap: ConfigurationsFormat): string { 
    if (!outputObject.newOrder.created) throw new ExceptionDateFormating(HttpStatusCode.BAD_REQUEST, 'Parameter "created" is required to format Date')
    if (!configMap.dateFormat) throw new ExceptionDateFormating(HttpStatusCode.BAD_REQUEST, 'Parameter "dateFormat" from config map is required to format Date')
    const splitCurrentDate = outputObject.newOrder.created.split('T')
    const splitDateConfigMapTemplate = configMap.dateFormat.split('T')
    const dateOperation = splitCurrentDate[0].split('-')
    const dateTemplate = splitDateConfigMapTemplate[0].split('-')
    const timeOperation = splitCurrentDate[1].split('Z')[0].split(':')
    const timeTemplate = splitDateConfigMapTemplate[1].split('Z')[0].split(':')
    let year
    let month
    let day
    let hour
    let minute
    let second

    dateTemplate.forEach((item, index) => {
      if (item === 'YYYY') year = dateOperation[index]
      if (item === 'MM') month = dateOperation[index]
      if (item === 'DD') day = dateOperation[index]
    })

    timeTemplate.forEach((item, index) => {
      if (item === 'HH') hour = timeOperation[index]
      if (item === 'mm') minute = timeOperation[index]
      if (item === 'SS') second = timeOperation[index]
    })

    return `${year}-${month}-${day}T${hour}:${minute}:${second}`
  }
}