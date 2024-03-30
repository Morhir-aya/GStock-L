import { Injectable } from '@angular/core';

import * as ExcelJS from 'exceljs';
import {Product} from "../product/product";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  async exportToExcel(products: Product[], fileName: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');


    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Product Name', key: 'name', width: 20 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Creation Date', key: 'dateCreate', width: 20 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'QR Code', key: 'qrCode', width: 30 },
    ];


    products.forEach(product => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
        price: product.price,
        dateCreate: product.dateCreate ? new Date(product.dateCreate).toLocaleDateString() : '',
        category: product.category ? product.category.category : '',
        qrCode: product.qrCode ? this.generateQRCodeLink(product.qrCode) : ''
      });
    });

    // Apply basic styling to header row and data rows
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber === 1) {

          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '007d04' }
          };
          cell.font = {
            color: { argb: 'FFFFFF' },
            bold: true
          };
        } else {

          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } };
        }
      });
    });


    const buffer = await workbook.xlsx.writeBuffer();


    this.saveExcelFile(buffer, fileName);
  }

  private saveExcelFile(buffer: ArrayBuffer, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateQRCodeLink(qrData: string): string {

    const qrCodeImageLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
    return qrCodeImageLink;
  }
}
