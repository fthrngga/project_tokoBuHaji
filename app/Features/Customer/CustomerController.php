<?php

namespace App\Features\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::with('user')->select('customers.*');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('phone_number', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('province', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('sort_by') && $request->filled('sort_dir')) {
            $sortBy = $request->sort_by;
            if (in_array($sortBy, ['name', 'email'])) {
                $query->join('users', 'customers.user_id', '=', 'users.id')
                      ->orderBy("users.{$sortBy}", $request->sort_dir);
            } else {
                $query->orderBy($sortBy, $request->sort_dir);
            }
        } else {
            $query->latest();
        }

        return Inertia::render('Features/Customer/Index', [
            'items' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'sort_by', 'sort_dir']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Features/Customer/FormPage');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', Rules\Password::defaults()],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'customer',
        ]);

        Customer::create([
            'user_id' => $user->id,
            'phone_number' => $validated['phone_number'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'province' => $validated['province'],
        ]);

        return redirect()->route('customers.index')->with('message', 'Customer created successfully.');
    }

    public function edit(Customer $customer)
    {
        // Load user relationship so FormPage can populate Name and Email
        $customer->load('user');
        return Inertia::render('Features/Customer/FormPage', [
            'item' => $customer,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class.',email,'.$customer->user_id],
            'password' => ['nullable', Rules\Password::defaults()],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
        ]);

        $userData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $customer->user()->update($userData);

        $customer->update([
            'phone_number' => $validated['phone_number'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'province' => $validated['province'],
        ]);

        return redirect()->route('customers.index')->with('message', 'Customer updated successfully.');
    }

    public function destroy(Customer $customer)
    {
        $user = $customer->user;
        $customer->delete();
        if ($user) {
            $user->delete();
        }
        return redirect()->route('customers.index')->with('message', 'Customer deleted successfully.');
    }
}
