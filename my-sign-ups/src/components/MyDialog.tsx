import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

interface MyDialogProps {
    title: string;
    children: React.ReactNode;
}

export default function MyDialog({ title, children }: MyDialogProps) {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained">{title}</Button>
            <Dialog open={open} onClose={() => { }}>
                <DialogActions>
                    <Button
                        sx={{ bgcolor: "secondary.main", color: "primary.contrastText" }}
                        onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
                <DialogTitle>{title}</DialogTitle>
                {children}
            </Dialog>
        </>
    );
}