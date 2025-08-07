import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useGlobalContext } from './context';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [showThanks, setShowThanks] = React.useState(false);
  const { open, setOpen, setCartItems } = useGlobalContext();

  const handleConfirmPayment = () => {
    setShowThanks(true);

    // ✅ امسح محتويات الكارت فورًا
    setCartItems([]);
    localStorage.removeItem("cart");

    // ✅ بعد 2 ثانية قفل الـ Dialog وارجعه للوضع الطبيعي
    setTimeout(() => {
      setShowThanks(false);
      setOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
    setShowThanks(false);
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      {showThanks ? (
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">Your payment has been successfully processed.</p>
          <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Go back to Home
          </a>
        </div>
      ) : (
        <>
          <DialogTitle sx={{ m: 0, p: 2 }}>Confirm Payment</DialogTitle>
          <DialogContent dividers>
            <p>ARE YOU SURE YOU WANT TO PAY IT?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmPayment}>YES</Button>
            <Button onClick={handleClose} color="error">Cancel</Button>
          </DialogActions>
        </>
      )}
    </BootstrapDialog>
  );
}
