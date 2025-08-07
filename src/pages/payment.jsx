import React, { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Payment() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Payment Data:", data);

    // ✅ مسح السلة من LocalStorage
    localStorage.removeItem("cart");

    // ✅ عرض رسالة نجاح
    setOpen(true);

    // ✅ مسح البيانات بعد الدفع
    reset();

    // ✅ الانتقال إلى الصفحة الرئيسية بعد 3 ثواني
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Mock Payment</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
        
        {/* Card Number */}
        <TextField
          label="Card Number"
          variant="outlined"
          {...register("cardNumber", {
            required: "Card number is required",
            pattern: { value: /^[0-9]{16}$/, message: "Card number must be 16 digits" }
          })}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber ? errors.cardNumber.message : ""}
        />

        {/* Expiry Date */}
        <TextField
          label="Expiry Date (MM/YY)"
          variant="outlined"
          {...register("expiry", {
            required: "Expiry date is required",
            pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Format MM/YY" }
          })}
          error={!!errors.expiry}
          helperText={errors.expiry ? errors.expiry.message : ""}
        />

        {/* CVV */}
        <TextField
          label="CVV"
          variant="outlined"
          {...register("cvv", {
            required: "CVV is required",
            pattern: { value: /^[0-9]{3}$/, message: "CVV must be 3 digits" }
          })}
          error={!!errors.cvv}
          helperText={errors.cvv ? errors.cvv.message : ""}
        />

        <Button type="submit" variant="contained" color="primary">
          Pay Now
        </Button>
      </form>

      {/* Snackbar */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ✅ Payment Successful! Redirecting to Home...
        </Alert>
      </Snackbar>
    </div>
  );
}
