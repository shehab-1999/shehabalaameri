import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface DangerDialogProps {
  open: boolean;
  onClose: ()=>void;
  onConfirm: () => void;
  title: string;
  content: string;
}

export default function DangerDialog(props: DangerDialogProps) {
  const { open, onClose, onConfirm, title, content } = props;

  return (
  <div>
    <Dialog 
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className='text-red-500 text-center font-bold text-base'>!{title}</DialogTitle>
      <DialogContent>
        <div id="alert-dialog-description" className='font-bold text-base'>
          {content}؟
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={onConfirm} autoFocus>
          تأكيد
        </Button>
      </DialogActions>
 </Dialog>
  </div>
  );
}