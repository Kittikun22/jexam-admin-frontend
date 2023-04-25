import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutDialog({ openLogout, setOpenLogout }) {

    const handleClose = () => {
        setOpenLogout(false);
    };

    const confirmLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <>
            <Dialog
                open={openLogout}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle align='center' variant='h5'>ยืนยันการออกจากระบบ</DialogTitle>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
                    <Button variant='contained' onClick={handleClose} size='large'>ยกเลิก</Button>
                    <Button variant='contained' onClick={confirmLogout} size='large' color='error'>ออกจากระบบ</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}