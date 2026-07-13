<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kuitansi Massal</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
            font-size: 14px;
        }
        .receipt-container {
            page-break-after: always;
        }
        .receipt-container:last-child {
            page-break-after: auto;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #004b93;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #004b93;
            margin: 0 0 5px 0;
            font-size: 28px;
        }
        .header p {
            margin: 0;
            color: #666;
        }
        .invoice-title {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .details-container {
            width: 100%;
            margin-bottom: 30px;
        }
        .details-table {
            width: 100%;
        }
        .details-table td {
            padding: 5px 0;
            vertical-align: top;
        }
        .details-table .label {
            font-weight: bold;
            width: 150px;
        }
        .item-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .item-table th, .item-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .item-table th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: bold;
        }
        .item-table .amount {
            text-align: right;
            font-weight: bold;
            color: #004b93;
        }
        .total-section {
            width: 100%;
            text-align: right;
            margin-bottom: 50px;
        }
        .total-section p {
            font-size: 18px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #777;
            font-size: 12px;
        }
        .stamp {
            position: absolute;
            top: 200px;
            right: 50px;
            color: rgba(34, 197, 94, 0.2);
            font-size: 60px;
            font-weight: bold;
            text-transform: uppercase;
            border: 5px solid rgba(34, 197, 94, 0.2);
            padding: 10px 20px;
            border-radius: 10px;
            transform: rotate(-15deg);
            z-index: -1;
        }
        .signature-box {
            float: right;
            width: 250px;
            text-align: center;
            margin-top: 20px;
        }
        .signature-box .signature-title {
            margin-bottom: 70px;
            font-weight: bold;
        }
        .signature-box .signature-name {
            font-weight: bold;
            text-decoration: underline;
        }
        .signature-wrapper {
            position: relative;
            height: 100px;
            margin-bottom: 10px;
        }
        .img-stamp {
            position: absolute;
            top: -40px;
            left: 20px;
            width: 140px;
            opacity: 0.85;
            z-index: 1;
        }
        .img-signature {
            position: absolute;
            top: -10px;
            left: 50px;
            width: 120px;
            z-index: 2;
        }
        .clear {
            clear: both;
        }
    </style>
</head>
<body>

@foreach($logs as $log)
    @php
        $payment = $log->payment;
        $customer = $payment->customer;
        $product = $payment->order->items->first()->product ?? null;
    @endphp

    <div class="receipt-container">
        <div class="stamp">LUNAS</div>

        <div class="header">
            <h1>TOKO PAK HAJI ELEKTRONIK</h1>
            <p>Jl. Jend. Sudirman, Koto Raja, Kec. Siak Kecil, Kabupaten Bengkalis, Riau 28771</p>
            <p>Telp: 082321671759 | Email: tokohajielektronik@gmail.com</p>
        </div>

        <div class="invoice-title">KUITANSI PEMBAYARAN</div>

        <table class="details-table details-container">
            <tr>
                <td style="width: 50%;">
                    <table class="details-table">
                        <tr><td class="label">No. Kuitansi</td><td>: KWT-{{ str_pad($log->id, 5, '0', STR_PAD_LEFT) }}</td></tr>
                        <tr><td class="label">Tanggal Bayar</td><td>: {{ \Carbon\Carbon::parse($log->paid_at)->format('d F Y H:i') }}</td></tr>
                        <tr><td class="label">No. Kontrak</td><td>: CTR-{{ str_pad($payment->id, 5, '0', STR_PAD_LEFT) }}</td></tr>
                    </table>
                </td>
                <td style="width: 50%;">
                    <table class="details-table">
                        <tr><td class="label">Nama Pelanggan</td><td>: {{ $customer->user->name }}</td></tr>
                        <tr><td class="label">Email</td><td>: {{ $customer->user->email }}</td></tr>
                        <tr><td class="label">No. Telepon</td><td>: {{ $customer->phone ?? '-' }}</td></tr>
                    </table>
                </td>
            </tr>
        </table>

        <table class="item-table">
            <thead>
                <tr>
                    <th>Deskripsi Pembayaran</th>
                    <th>Tipe</th>
                    <th style="text-align: right;">Jumlah</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>{{ $product ? $product->name : 'Produk' }}</strong><br>
                        @if($log->type === 'down_payment')
                            Pembayaran Uang Muka (DP)
                        @else
                            Pembayaran Angsuran Ke-{{ $log->installment_number }}
                        @endif
                    </td>
                    <td>
                        @if($log->type === 'down_payment')
                            Uang Muka
                        @else
                            Angsuran
                        @endif
                    </td>
                    <td class="amount">Rp {{ number_format($log->amount, 0, ',', '.') }}</td>
                </tr>
            </tbody>
        </table>

        <div class="total-section">
            <p>Total Dibayar: Rp {{ number_format($log->amount, 0, ',', '.') }}</p>
        </div>

        <div class="signature-box">
            <div class="signature-title">Hormat Kami,</div>
            <div class="signature-wrapper">
                @if(file_exists(public_path('image/stamp.png')))
                    <img src="{{ public_path('image/stamp.png') }}" class="img-stamp" alt="Cap Toko">
                @endif
                @if(file_exists(public_path('image/signature.png')))
                    <img src="{{ public_path('image/signature.png') }}" class="img-signature" alt="Tanda Tangan">
                @endif
            </div>
            <div class="signature-name">Ernawati (Buk Haji)</div>
            <div>Pemilik Toko</div>
        </div>
        <div class="clear"></div>

        <div class="footer">
            <p>Terima kasih atas pembayaran Anda. Harap simpan kuitansi ini sebagai bukti pembayaran yang sah.</p>
            <p>Dokumen ini dicetak secara otomatis oleh sistem Toko Pak Haji Elektronik.</p>
        </div>
    </div>
@endforeach

</body>
</html>
