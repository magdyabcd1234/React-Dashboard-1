import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Order, Invoice } from '../types/dashboard';

/**
 * Generates and downloads a clean, professional retail/order receipt PDF.
 */
export function exportOrderReceiptPDF(order: Order): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor: [number, number, number] = [79, 70, 229]; // Indigo #4f46e5
  const darkTextColor: [number, number, number] = [30, 41, 59]; // Slate-800
  const mutedTextColor: [number, number, number] = [100, 116, 139]; // Slate-500

  // 1. Top Header Accent Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 10, 'F');

  // 2. Brand & Document Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('ApexDash', 20, 26);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(...primaryColor);
  doc.roundedRect(63, 20, 14, 7, 2, 2, 'F');
  doc.text('PRO', 65.5, 25);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Enterprise Cloud & Analytics Suite', 20, 32);
  doc.text('www.apexdash.io | support@apexdash.io', 20, 37);

  // Right Header: Receipt Details
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('PAYMENT RECEIPT', 200, 26, { align: 'right' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text(`Receipt #: REC-${order.id}`, 200, 32, { align: 'right' });
  doc.text(`Date: ${order.date || new Date().toLocaleDateString()}`, 200, 37, { align: 'right' });
  doc.text(`Status: ${order.status.toUpperCase()}`, 200, 42, { align: 'right' });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(20, 47, 200, 47);

  // 3. Customer & Payment Information Cards
  // Billed To
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 52, 85, 32, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Billed To:', 25, 60);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(order.customer.name, 25, 66);
  doc.setTextColor(...mutedTextColor);
  doc.text(order.customer.email, 25, 72);
  doc.text('Verified Customer Account', 25, 78);

  // Payment Method Card
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(115, 52, 85, 32, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Payment Information:', 120, 60);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Method: ${order.paymentMethod || 'Credit Card'}`, 120, 66);
  doc.setTextColor(...mutedTextColor);
  doc.text(`Order ID: ${order.id}`, 120, 72);
  doc.text(`Currency: USD ($)`, 120, 78);

  // 4. Itemized Table
  const subtotal = order.amount;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  autoTable(doc, {
    startY: 92,
    head: [['Item Description', 'Qty', 'Unit Price', 'Tax (5%)', 'Total']],
    body: [
      [
        order.product || 'Standard Enterprise Service Plan',
        '1',
        `$${subtotal.toFixed(2)}`,
        `$${tax.toFixed(2)}`,
        `$${total.toFixed(2)}`,
      ],
    ],
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    bodyStyles: {
      textColor: darkTextColor,
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: 20, right: 20 },
    theme: 'striped',
  });

  // 5. Total Summary Section
  // @ts-expect-error autoTable adds lastAutoTable to jsPDF instance
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 125;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(120, finalY, 80, 42, 3, 3, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Subtotal:', 125, finalY + 8);
  doc.text(`$${subtotal.toFixed(2)}`, 195, finalY + 8, { align: 'right' });

  doc.text('Tax (5%):', 125, finalY + 16);
  doc.text(`$${tax.toFixed(2)}`, 195, finalY + 16, { align: 'right' });

  doc.text('Discount:', 125, finalY + 24);
  doc.text('$0.00', 195, finalY + 24, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.line(125, finalY + 28, 195, finalY + 28);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Total Paid:', 125, finalY + 36);
  doc.text(`$${total.toFixed(2)}`, 195, finalY + 36, { align: 'right' });

  // 6. Security Barcode / Verification Badge
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(20, finalY, 90, 42, 3, 3, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Verification & Security', 25, finalY + 8);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Authentic Digital Electronic Receipt', 25, finalY + 15);
  doc.text(`Auth Token: ${Math.random().toString(36).substring(2, 12).toUpperCase()}`, 25, finalY + 22);
  doc.text('This receipt was automatically generated and verified.', 25, finalY + 29);
  doc.text('Authorized by ApexDash Finance Operations.', 25, finalY + 36);

  // 7. Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 270, 200, 270);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Thank you for choosing ApexDash Enterprise.', 105, 276, { align: 'center' });
  doc.text('Questions? Contact us at billing@apexdash.io or +1 (800) 555-0199', 105, 281, { align: 'center' });

  // Download PDF
  doc.save(`Receipt-${order.id}.pdf`);
}

/**
 * Generates and downloads a corporate invoice PDF.
 */
export function exportInvoicePDF(invoice: Invoice | {
  id: string;
  number: string;
  customer: string;
  email: string;
  amount: number;
  issueDate?: string;
  dueDate?: string;
  status: string;
}): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor: [number, number, number] = [79, 70, 229];
  const darkTextColor: [number, number, number] = [30, 41, 59];
  const mutedTextColor: [number, number, number] = [100, 116, 139];

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 10, 'F');

  // Brand Name
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('ApexDash', 20, 26);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Enterprise Cloud Services Inc.', 20, 32);
  doc.text('450 Tech Avenue, Suite 800, San Francisco, CA', 20, 37);

  // Invoice Title & Info
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('INVOICE', 200, 26, { align: 'right' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text(`Invoice Number: ${invoice.number || invoice.id}`, 200, 33, { align: 'right' });
  doc.text(`Issue Date: ${invoice.issueDate || 'Today'}`, 200, 38, { align: 'right' });
  doc.text(`Due Date: ${invoice.dueDate || '30 Days Net'}`, 200, 43, { align: 'right' });
  doc.text(`Payment Status: ${invoice.status.toUpperCase()}`, 200, 48, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.line(20, 52, 200, 52);

  // Client Info Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 56, 180, 25, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Invoice To (Client):', 25, 63);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Company / Client: ${invoice.customer}`, 25, 70);
  doc.setTextColor(...mutedTextColor);
  doc.text(`Billing Contact: ${invoice.email}`, 25, 76);

  // Table
  autoTable(doc, {
    startY: 87,
    head: [['Description', 'Period', 'Rate', 'Amount']],
    body: [
      [
        'Dedicated Enterprise Cloud Infrastructure & API Quota',
        'Monthly Subscription',
        `$${invoice.amount.toFixed(2)}`,
        `$${invoice.amount.toFixed(2)}`,
      ],
      [
        'Enterprise SLA 99.99% Guaranteed Support Tier',
        'Included',
        '$0.00',
        '$0.00',
      ],
    ],
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: darkTextColor,
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: 95 },
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: 20, right: 20 },
    theme: 'grid',
  });

  // @ts-expect-error autoTable adds lastAutoTable to jsPDF instance
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 120;

  // Payment instructions & total
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Payment Instructions:', 20, finalY + 5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Bank Name: Silicon Valley Tech Bank', 20, finalY + 12);
  doc.text('Account Number: 9874-4521-0021-9988', 20, finalY + 17);
  doc.text('Routing Number: 121000358 | SWIFT: SVTBUS33', 20, finalY + 22);

  // Total summary card
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(120, finalY, 80, 28, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Total Amount Due:', 125, finalY + 10);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(`$${invoice.amount.toFixed(2)} USD`, 195, finalY + 20, { align: 'right' });

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 270, 200, 270);
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('Thank you for partnering with ApexDash Enterprise.', 105, 276, { align: 'center' });

  doc.save(`Invoice-${invoice.number || invoice.id}.pdf`);
}

/**
 * Generates an executive analytical report PDF.
 */
export function exportExecutiveReportPDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor: [number, number, number] = [79, 70, 229];
  const darkTextColor: [number, number, number] = [30, 41, 59];
  const mutedTextColor: [number, number, number] = [100, 116, 139];

  // Top Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 10, 'F');

  // Title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('ApexDash', 20, 26);

  doc.setFontSize(16);
  doc.setTextColor(...darkTextColor);
  doc.text('Executive Analytics Report', 200, 26, { align: 'right' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 200, 33, { align: 'right' });
  doc.text('Period: Year-to-Date Performance', 200, 38, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.line(20, 43, 200, 43);

  // Key KPI Cards Table
  autoTable(doc, {
    startY: 48,
    head: [['Metric', 'Current Value', 'Growth vs Last Period', 'Status']],
    body: [
      ['Total Gross Revenue', '$128,430.50', '+14.8%', 'Outperforming Target'],
      ['Active Enterprise Customers', '42,892', '+8.2%', 'Healthy Expansion'],
      ['Total Processed Orders', '12,450', '+22.4%', 'Record Volume'],
      ['Average Order Value (AOV)', '$246.80', '-2.1%', 'Stable'],
    ],
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: darkTextColor,
      fontSize: 9,
    },
    margin: { left: 20, right: 20 },
    theme: 'striped',
  });

  // Monthly breakdown table
  autoTable(doc, {
    // @ts-expect-error autoTable adds lastAutoTable to jsPDF instance
    startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 90,
    head: [['Quarter / Month', 'Revenue', 'Operating Profit', 'Operating Expenses', 'Net Margin']],
    body: [
      ['Q1 (Jan - Mar)', '$144,000.00', '$86,000.00', '$58,000.00', '59.7%'],
      ['Q2 (Apr - Jun)', '$182,000.00', '$113,000.00', '$69,000.00', '62.0%'],
      ['Q3 (Jul - Sep)', '$255,000.00', '$165,000.00', '$90,000.00', '64.7%'],
      ['Q4 Projected', '$345,000.00', '$235,500.00', '$109,500.00', '68.2%'],
    ],
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: darkTextColor,
      fontSize: 9,
    },
    margin: { left: 20, right: 20 },
    theme: 'grid',
  });

  // Traffic Breakdown
  autoTable(doc, {
    // @ts-expect-error autoTable adds lastAutoTable to jsPDF instance
    startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 160,
    head: [['Traffic & Acquisition Channel', 'Visitors', 'Share %', 'Conversion Rate']],
    body: [
      ['Direct Search & Enterprise Referral', '4,250', '42%', '4.8%'],
      ['Professional Social Media (LinkedIn)', '2,830', '28%', '3.2%'],
      ['Industry Referral Sites', '1,820', '18%', '2.9%'],
      ['Targeted Email Marketing', '1,200', '12%', '5.4%'],
    ],
    headStyles: {
      fillColor: [16, 185, 129], // Emerald
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: darkTextColor,
      fontSize: 9,
    },
    margin: { left: 20, right: 20 },
    theme: 'striped',
  });

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 270, 200, 270);
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.text('ApexDash Business Intelligence & Automated Reporting Suite', 105, 276, { align: 'center' });
  doc.text('CONFIDENTIAL - Internal Executive Use Only', 105, 281, { align: 'center' });

  doc.save(`ApexDash-Executive-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
}
