export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  iconLink?: string;
}

/**
 * List files from Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  searchQuery = ''
): Promise<DriveFile[]> {
  let query = "trashed = false";
  if (searchQuery.trim()) {
    query += ` and name contains '${searchQuery.replace(/'/g, "\\'")}'`;
  }

  const params = new URLSearchParams({
    q: query,
    fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink)',
    pageSize: '25',
    orderBy: 'modifiedTime desc'
  });

  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gagal mengambil daftar file: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Upload a text or binary file to Google Drive using multipart upload
 */
export async function uploadFileToDrive(
  accessToken: string,
  name: string,
  content: string | Blob,
  mimeType = 'text/plain'
): Promise<DriveFile> {
  const metadata = {
    name,
    mimeType
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  let body: string | Blob;

  if (typeof content === 'string') {
    body =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      `Content-Type: ${mimeType}\r\n\r\n` +
      content +
      closeDelimiter;
  } else {
    // Blob handling
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    body = new Blob([
      `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n`,
      metadataBlob,
      `${delimiter}Content-Type: ${mimeType}\r\n\r\n`,
      content,
      closeDelimiter
    ], { type: `multipart/related; boundary=${boundary}` });
  }

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,modifiedTime,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal mengunggah file: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete a file from Google Drive (Mandatory explicit user confirmation required by UI before calling this)
 */
export async function deleteDriveFile(
  accessToken: string,
  fileId: string
): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gagal menghapus file: ${response.statusText}`);
  }
}

/**
 * Generate formatted HTML / Text receipt and upload to Google Drive
 */
export async function saveOrderInvoiceToDrive(
  accessToken: string,
  orderData: {
    orderId: string;
    customerName: string;
    whatsapp: string;
    address: string;
    city: string;
    items: Array<{ name: string; quantity: number; price: number; normalPrice: number }>;
    totalNormal: number;
    totalSavings: number;
    shippingFee: number;
    finalTotal: number;
    paymentMethod: string;
  }
): Promise<DriveFile> {
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const fileContent = `========================================================
INVOICE PEMESANAN SUPLEMEN — HYPER TROPHY (EVOLENE STORE)
========================================================
No. Invoice : #${orderData.orderId}
Tanggal     : ${dateStr}
Status      : Menunggu Konfirmasi WhatsApp

DATA PENERIMA:
- Nama Lengkap : ${orderData.customerName}
- No. WhatsApp : ${orderData.whatsapp}
- Alamat Kirim : ${orderData.address}
- Kota/Kec     : ${orderData.city}
- Pembayaran   : ${orderData.paymentMethod.toUpperCase()}

RINCIAN PRODUK YANG DIPESAN:
--------------------------------------------------------
${orderData.items
  .map(
    (item, idx) =>
      `${idx + 1}. ${item.name}\n` +
      `   Jumlah : ${item.quantity} unit\n` +
      `   Harga  : Rp ${item.price.toLocaleString('id-ID')} (Normal: Rp ${item.normalPrice.toLocaleString('id-ID')})\n` +
      `   Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
  )
  .join('\n\n')}

--------------------------------------------------------
RINGKASAN BIAYA & DISKON:
- Total Harga Normal : Rp ${orderData.totalNormal.toLocaleString('id-ID')}
- Total Hemat Diskon : -Rp ${orderData.totalSavings.toLocaleString('id-ID')}
- Biaya Ongkos Kirim : Rp ${orderData.shippingFee === 0 ? '0 (GRATIS ONGKIR)' : orderData.shippingFee.toLocaleString('id-ID')}
========================================================
TOTAL AKHIR PEMBAYARAN: Rp ${orderData.finalTotal.toLocaleString('id-ID')}
========================================================

Catatan:
Simpan invoice ini sebagai bukti pemesanan Anda di Hyper Trophy.
Semua produk Evolene dijamin 100% Original dan berizin BPOM RI.
Layanan Pelanggan WhatsApp: +6281319337833
`;

  const fileName = `Invoice_HyperTrophy_${orderData.orderId}.txt`;
  return uploadFileToDrive(accessToken, fileName, fileContent, 'text/plain');
}
