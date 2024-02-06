import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'

export const processXmlBuffer = (xmlBuffer: Buffer): void => {
  try {
    const xmlData = xmlBuffer.toString('utf-8')
    const parser = new XMLParser()
    const jObj = parser.parse(xmlData)

    if ((jObj.Products.Product !== null) && Array.isArray(jObj.Products.Product)) {
      const currentDate = new Date().getTime()

      jObj.Products.Product.forEach((product: any) => {
        product.dateAdded = currentDate
      })

      const parsedFilePath = './data/inventory.json'
      fs.writeFileSync(parsedFilePath, JSON.stringify(jObj, null, 2), 'utf-8')
    } else {
      console.error('No products found in the XML file.')
    }
  } catch (err) {
    console.error('Error processing XML file:', err)
  }
}
