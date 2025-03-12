'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Divider, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MyDialog from './MyDialog';
import EventTypeForm from './forms/EventTypeForm';
import { EventTypeInputs } from '@/types/eventTypes';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function CreateEventTypeDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EventTypeInputs>()

    const onSubmit: SubmitHandler<EventTypeInputs> = (data: EventTypeInputs) => {
        fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
    }
    const [numberOfRoles, setNumberOfRoles] = React.useState(0);
    const roleLimitReached = () => numberOfRoles >= 4;
    const incrementRoles = () => {
        if (!roleLimitReached()) {
            setNumberOfRoles(numberOfRoles + 1);
        }
    }


    const roleInput = <div className="flex m-3">
        <TextField className="w-6/6" required placeholder="Role" {...register("location")} />
    </div>;

    return (
        <MyDialog  title="Add Event Type">
            <EventTypeForm onSubmit={onSubmit} /> 
        </MyDialog>
    );
}


