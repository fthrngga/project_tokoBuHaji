<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Features\Product\Product;
use App\Features\Product\Category;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil kategori yang sudah ada
        $elektronikCategory = Category::where('slug', 'elektronik')->first();
        $mebelCategory = Category::where('slug', 'mebel')->first();

        $products = [
            [
                'category_id' => $elektronikCategory->id,
                'name' => 'Smart TV 4K 55 Inch',
                'sku' => 'HJE-TV-001',
                'description' => 'Nikmati pengalaman menonton sinematik dengan Smart TV 4K ultra high definition. Dilengkapi dengan sistem operasi Android TV dan remote suara.',
                'price' => 6850000,
                'stock' => 15,
                'weight' => 12000, // dalam gram
                'specifications' => json_encode(['Ukuran Layar' => '55 inch', 'Resolusi' => '4K UHD', 'Sistem Operasi' => 'Android TV']),
                'images' => ['products/tv.png']
            ],
            [
                'category_id' => $elektronikCategory->id,
                'name' => 'Speaker Bluetooth Portabel',
                'sku' => 'HJE-SPK-001',
                'description' => 'Bawa musik Anda ke mana saja dengan speaker portabel berkualitas tinggi. Bass yang dalam dan suara jernih dengan daya tahan baterai hingga 8 jam.',
                'price' => 1150000,
                'stock' => 30,
                'weight' => 800,
                'specifications' => json_encode(['Konektivitas' => 'Bluetooth 5.0', 'Daya Tahan' => '8 Jam', 'Fitur' => 'Tahan Air IPX7']),
                'images' => ['products/speaker.png']
            ],
            [
                'category_id' => $mebelCategory->id,
                'name' => 'Sofa Minimalis Abu-abu',
                'sku' => 'HJE-SOFA-001',
                'description' => 'Sofa 3 dudukan dengan desain minimalis modern. Dibuat dengan kain premium yang lembut dan rangka kayu solid yang kokoh.',
                'price' => 4200000,
                'stock' => 10,
                'weight' => 45000,
                'specifications' => json_encode(['Kapasitas' => '3 Dudukan', 'Material' => 'Kain Premium, Kayu Solid', 'Warna' => 'Abu-abu Terang']),
                'images' => ['products/sofa.png']
            ],
            [
                'category_id' => $mebelCategory->id,
                'name' => 'Lampu Meja Industrial',
                'sku' => 'HJE-LMP-001',
                'description' => 'Tambahkan sentuhan industrial pada ruang kerja atau kamar tidur Anda. Dibuat dari material metal berkualitas dengan finishing matte black.',
                'price' => 750000,
                'stock' => 25,
                'weight' => 1500,
                'specifications' => json_encode(['Material' => 'Metal', 'Warna' => 'Matte Black', 'Tipe Bohlam' => 'E27']),
                'images' => ['products/lampu.png']
            ],
        ];

        foreach ($products as $productData) {
            $product = Product::create([
                'category_id' => $productData['category_id'],
                'name' => $productData['name'],
                'slug' => Str::slug($productData['name']),
                'sku' => $productData['sku'],
                'description' => $productData['description'],
                'price' => $productData['price'],
                'stock' => $productData['stock'],
                'weight' => $productData['weight'],
                'specifications' => $productData['specifications'],
                'is_featured' => true,
                'is_published' => true,
            ]);

            // Tambahkan gambar ke produk
            foreach ($productData['images'] as $imagePath) {
                $product->images()->create(['image_path' => $imagePath]);
            }
        }
    }
}
