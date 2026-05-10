<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        return Inertia::render('settings/addresses/index', [
            'addresses' => auth()->user()->addresses()->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:50',
            'recipient_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'province' => 'required|string',
            'city' => 'required|string',
            'district' => 'required|string',
            'village' => 'required|string',
            'address_detail' => 'required|string',
            'postal_code' => 'required|string|max:10',
            'is_primary' => 'boolean',
        ]);

        // Jika set sebagai utama, reset yang lain
        if ($request->is_primary) {
            auth()->user()->addresses()->update(['is_primary' => false]);
        }

        auth()->user()->addresses()->create($validated);

        return back()->with('success', 'Alamat berhasil ditambahkan.');
    }

    public function destroy(Address $address)
    {
        if ($address->user_id !== auth()->id()) abort(403);
        $address->delete();
        return back()->with('success', 'Alamat berhasil dihapus.');
    }
    
    public function setPrimary(Address $address)
    {
        if ($address->user_id !== auth()->id()) abort(403);
        auth()->user()->addresses()->update(['is_primary' => false]);
        $address->update(['is_primary' => true]);
        return back();
    }
}