<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Keterangan Lunas - {{ $payment->id }}</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            color: #222;
            margin: 0;
            padding: 40px;
            background-color: #fff;
        }
        .border {
            border: 10px solid #004b93;
            padding: 40px;
            position: relative;
            height: 100%;
        }
        .header {
            text-align: center;
            border-bottom: 3px double #004b93;
            padding-bottom: 20px;
            margin-bottom: 40px;
        }
        .header h1 {
            color: #004b93;
            margin: 0;
            font-size: 36px;
            text-transform: uppercase;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 16px;
        }
        .title {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 40px;
            text-decoration: underline;
            letter-spacing: 2px;
        }
        .content {
            font-size: 18px;
            line-height: 1.6;
            text-align: justify;
        }
        .details-table {
            margin: 30px auto;
            width: 80%;
            font-size: 18px;
        }
        .details-table td {
            padding: 8px;
        }
        .details-table .label {
            font-weight: bold;
            width: 250px;
        }
        .highlight {
            font-weight: bold;
            color: #004b93;
        }
        .signature-section {
            margin-top: 50px;
            width: 100%;
        }
        .signature-box {
            float: right;
            width: 300px;
            text-align: center;
        }
        .signature-title {
            margin-bottom: 80px;
        }
        .signature-name {
            font-weight: bold;
            text-decoration: underline;
            font-size: 20px;
        }
        .signature-wrapper {
            position: relative;
            height: 120px;
            margin-bottom: 10px;
        }
        .img-stamp {
            position: absolute;
            top: -50px;
            left: 20px;
            width: 180px;
            opacity: 0.85;
            z-index: 1;
        }
        .img-signature {
            position: absolute;
            top: -15px;
            left: 70px;
            width: 150px;
            z-index: 2;
        }
        .clear {
            clear: both;
        }
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 120px;
            color: rgba(34, 197, 94, 0.1);
            font-weight: bold;
            text-transform: uppercase;
            z-index: -1;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div class="border">
        <div class="watermark">LUNAS 100%</div>
        
        <div class="header">
            <h1>TOKO PAK HAJI ELEKTRONIK</h1>
            <p>Jl. Jend. Sudirman, Koto Raja, Kec. Siak Kecil, Kabupaten Bengkalis, Riau 28771</p>
            <p>Telp: 082321671759 | Email: tokohajielektronik@gmail.com</p>
        </div>

        <div class="title">SURAT KETERANGAN LUNAS</div>

        <div class="content">
            <p>Yang bertanda tangan di bawah ini, selaku Manajemen Toko Pak Haji Elektronik, menerangkan dengan sesungguhnya bahwa pelanggan berikut:</p>
            
            <table class="details-table">
                <tr><td class="label">Nama Pelanggan</td><td>: <span class="highlight">{{ $customer->user->name }}</span></td></tr>
                <tr><td class="label">Nomor Kontrak</td><td>: <span class="highlight">CTR-{{ str_pad($payment->id, 5, '0', STR_PAD_LEFT) }}</span></td></tr>
                <tr><td class="label">Barang yang Dikredit</td><td>: {{ $product ? $product->name : '-' }}</td></tr>
                <tr><td class="label">Total Nilai Kontrak</td><td>: Rp {{ number_format($payment->paymentLogs->where('status','verified')->sum('amount'), 0, ',', '.') }}</td></tr>
            </table>

            <p>Telah menuntaskan seluruh kewajiban pembayaran (angsuran) secara penuh dan tanpa tunggakan. Oleh karena itu, barang tersebut dinyatakan sah menjadi hak milik penuh pelanggan dan seluruh ikatan hutang piutang terkait kontrak ini dinyatakan <strong style="color: green;">LUNAS</strong>.</p>
        </div>

        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-title">Bengkalis, {{ date('d F Y') }}<br>Hormat Kami,</div>
                
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
        </div>
    </div>
</body>
</html>
