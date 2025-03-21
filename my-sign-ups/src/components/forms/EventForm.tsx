import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    TextField,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    Box,
    Tabs,
    Tab,
    Container,
} from "@mui/material";
import { EventData } from "@/types/eventData";
import RoleForm from "./RoleForm";

type EventFormProps = {
    onSubmit: (data: any) => void;
    readonly: boolean;
    existingEvent: EventData | null;
    actionButtons?: React.ReactNode;
    submitButton?: React.ReactNode;
};

export function EventForm({ onSubmit, readonly, existingEvent, actionButtons, submitButton }: EventFormProps) {
    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<EventData>({
        defaultValues: {
            roles: [{ role: "", limit: 0 }],
        },
    });

    const [capTabs, setCapTabs] = useState(0);
    const [limitedAttendees, setLimitedAttendees] = useState<boolean>(existingEvent?.limitedAttendees ?? false);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCapTabs(newValue);
        setValue("rolesLimited", newValue === 1);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "roles",
    });

    useEffect(() => {
        if (existingEvent) {
            setValue("_id", existingEvent._id);
            setValue("name", existingEvent.name);
            setValue("date", existingEvent.date);
            setValue("description", existingEvent.description);
            setValue("location", existingEvent.location);
            setValue("capacity", existingEvent.capacity);
            setValue("limitedAttendees", existingEvent.limitedAttendees);
            setValue("rolesLimited", existingEvent.rolesLimited);

        if(existingEvent.roles){

            existingEvent.roles.forEach((role, index) => {
                if (index > 0) append({ role: "", limit: 0 });
                setValue(`roles.${index}.role`, role.role);
                setValue(`roles.${index}.limit`, role.limit);
            });
        }
    }
    }, [existingEvent, setValue, append]);

    const roleLimitReached = () => fields.length >= 4; //TODO config this? Settings?
    
    return (
        <Container sx={{ width: '100%', p:2 }}>
            <fieldset disabled={readonly} >
                <form onSubmit={handleSubmit(onSubmit)}>
                {existingEvent && <input type="hidden" value={existingEvent._id.toString()} name="id" />}
                    <Stack spacing={4}>
                        {/* Event Name */}
                        {
                            !readonly && <FormControl fullWidth>
                                <TextField label="Event Name" required {...register("name")} />
                            </FormControl>
                        }

                        {/* Event Date */}
                        <FormControl fullWidth>
                            <InputLabel variant="outlined" shrink>Event Date</InputLabel>
                            <TextField type="date" required {...register("date")} />
                        </FormControl>


                        {/* Description */}
                        <FormControl fullWidth>
                            <TextField
                                label="Description (optional)"
                                multiline
                                rows={3}
                                {...register("description")}
                            />
                        </FormControl>

                        {/* Location */}
                        <FormControl fullWidth>
                            <TextField label="Location" required {...register("location")} />
                        </FormControl>

                        {/* Limit Attendees Checkbox */}
                        <FormGroup>
                            <Controller
                                control={control}
                                name="limitedAttendees"
                                render={() => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={limitedAttendees}
                                                {...register("limitedAttendees")}
                                                onChange={() => setLimitedAttendees(!limitedAttendees)}
                                                sx={{
                                                    color: "primary.main",
                                                    '&.Mui-checked': { color: "secondary.main" },
                                                }}
                                            />
                                        }
                                        label="Limit attendees?"
                                        labelPlacement="start"
                                    />
                                )}
                            />
                        </FormGroup>

                        {/* Conditional Capacity and Roles Tabs */}
                        {limitedAttendees && (
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={capTabs} onChange={handleChange} aria-label="Capacity tabs">
                                    <Tab
                                        label="Capacity"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label="By Role"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </Box>
                        )}

                        {/* Role-based Capacity */}
                        {limitedAttendees && watch("rolesLimited") && (
                            <RoleForm
                                readonly={readonly}
                                fields={fields}
                                roleLimitReached={roleLimitReached}
                                register={register}
                                append={append}
                                remove={remove}
                            />
                        )}

                        {/* General Capacity Field */}
                        {limitedAttendees && !watch("rolesLimited") && (
                            <FormControl fullWidth>
                                {(readonly && watch("capacity")) || !readonly ? (
                                    <TextField
                                        label="Capacity"
                                        placeholder="(leave blank for unlimited)"
                                        {...register("capacity")}
                                    />
                                ) : null}
                                {readonly && !watch("capacity") && (
                                    <TextField label="Capacity" value="Unlimited" />
                                )}
                            </FormControl>
                        )}
                    </Stack>
                    <Box my={2}>
                        {submitButton}
                    </Box>
                </form>
            </fieldset>
               {actionButtons}
        </Container>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
