<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Transformers\PaymentTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function __construct()
    {
        // all transaction need admin permissions except (index)
        $this->middleware(['admin'])->except(['index']);
    }
    /**
     * Get all payment methods
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(fractal()
            ->collection(Payment::all())
            ->transformWith(new PaymentTransformer())
            ->toArray()['data']);
    }

    /**
     * create new payment
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        // validate request
        $validator = $this->validateRequest($request);

        if($validator->fails()){
            return $this->sendError($validator->errors(), 422);
        }

        // create new payment method
        $values = $request->all();
        $values['currencies'] = json_encode(explode(',', $values['currencies']));
        unset($values['errors']); // remove errors from requested data
        /*
         * add slug columns
         *  we can generate uuid for slug from client side
         * but I want to generate it from server side its just my preferred
         */
        $values['slug'] = Str::uuid();
        // create payment method (insert into database)
        $data = Payment::create($values);

        // send created payment method to client-app
        return response()->json(fractal()
            ->item($data)
            ->transformWith(new PaymentTransformer())
            ->toArray()['data']);
    }

    /**
     * upload image for the payment method
     * @param  Request  $request
     * @param  Payment  $payment
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Payment $payment)
    {
        // validate request
        $validator = $this->validateRequest($request);

        if($validator->fails()){
            return $this->sendError( $validator->errors(), 422);
        }

        $values = $request->all();

        if (!is_array($values['currencies']))
            $values['currencies'] = json_encode(explode(',', $values['currencies']));
        // update payment method
        $payment->update($values);

        return response()->json(fractal()
            ->item($payment)
            ->transformWith(new PaymentTransformer())
            ->toArray()['data']);
    }

    /**
     * delete payment
     * @param  Payment  $payment
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Payment $payment)
    {
        $payment->delete();

        return $this->sendResponse([]);
    }

    /**
     * upload payment method image
     * @param  Request  $request
     */
    public function upload(Request $request)
    {
        $uploadedFile = $request->file('File');
        $filename = time().$uploadedFile->getClientOriginalName();

        Storage::disk('local')->putFileAs(
            'public/images/'. $filename,
            $uploadedFile,
            $filename
        );

        return response()->json($filename);
    }

    /**
     * validation input
     * @param  Request  $request
     * @return \Illuminate\Contracts\Validation\Validator
     */
    private function validateRequest(Request $request): \Illuminate\Contracts\Validation\Validator
    {
        return Validator::make($request->all(), [
            'name' => 'required',
            'currencies' => 'required',
            'min_deposit' => 'required|numeric|min:0',
            'max_deposit' => 'required|numeric',
            'max_withdrawal' => 'required|numeric',
            'min_withdrawal' => 'required|numeric|min:0',
            'img' => 'required',
        ]);
    }
}
