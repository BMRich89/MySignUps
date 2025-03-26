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
    Typography,
} from "@mui/material";
import { EventData } from "@/types/eventData";
import RoleForm from "./RoleForm";

// Props Type Definition
type EventFormProps = {
    onSubmit: (data: any) => void;
    readonly: boolean;
    existingEvent: EventData | null;
    actionButtons?: React.ReactNode;
    submitButton?: React.ReactNode;
};

export function EventForm({
    onSubmit,
    readonly,
    existingEvent,
    actionButtons,
    submitButton,
}: EventFormProps) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EventData>({
        defaultValues: {
            roles: [{ role: "", limit: 0 }],
        },
    });

    const [capTabs, setCapTabs] = useState(0);
    const [limitedAttendees, setLimitedAttendees] = useState<boolean>(existingEvent?.limitedAttendees ?? false);
    const todaysDate = new Date();

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

            if (existingEvent.roles) {
                existingEvent.roles.forEach((role, index) => {
                    if (index > 0) append({ role: "", limit: 0 });
                    setValue(`roles.${index}.role`, role.role);
                    setValue(`roles.${index}.limit`, role.limit);
                });
            }
        }
    }, [existingEvent, setValue, append]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCapTabs(newValue);
        setValue("rolesLimited", newValue === 1);
    };

    const roleLimitReached = () => fields.length >= 4; // TODO: Make configurable via settings

    watch("date"); // Watch date field to trigger re-validation

    return (
        <Container sx={{ width: "100%", p: 2 }}>
            <fieldset disabled={readonly}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box minHeight={"45vh"}>
                        {existingEvent && <input type="hidden" value={existingEvent._id.toString()} name="id" />}
                        <Stack spacing={4}>
                            {!readonly && (
                                <FormControl fullWidth>
                                    <TextField label="Event Name" required {...register("name",{minLength: { value: 3, message: "Event Name must be at least 3 characters long" }} )} />
                                    {errors.name && <Typography color="error">{errors.name.message}</Typography>}
                                </FormControl>
                            )}

                            <FormControl fullWidth>
                                <InputLabel variant="outlined" shrink>Event Date</InputLabel>
                                <TextField
                                    type="date"
                                    required
                                    {...register("date", {
                                        required: "Date is required",
                                        validate: (value) => new Date(value) > todaysDate || "Please select a future date",
                                    })}
                                />
                                {errors.date && <Typography color="error">{errors.date.message}</Typography>}
                            </FormControl>

                            <FormControl fullWidth>
                                <TextField label="Description (optional)" multiline rows={3} {...register("description")} />
                            </FormControl>

                            <FormControl fullWidth>
                                <TextField label="Location" required {...register("location",{minLength: { value: 3, message: "Event location must be at least 3 characters long" }})} />
                                {errors.location && <Typography color="error">{errors.location.message}</Typography>}
                            </FormControl>

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
                                                        "&.Mui-checked": { color: "secondary.main" },
                                                    }}
                                                />
                                            }
                                            label="Limit attendees?"
                                            labelPlacement="start"
                                        />
                                    )}
                                />
                            </FormGroup>

                            {limitedAttendees && (
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <Tabs value={capTabs} onChange={handleChange} aria-label="Capacity tabs">
                                        <Tab label="Capacity" {...a11yProps(0)} />
                                        <Tab label="By Role" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                            )}

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

                            {limitedAttendees && !watch("rolesLimited") && (
                                <FormControl fullWidth>
                                    <TextField
                                        label="Capacity"
                                        placeholder="(leave blank for unlimited)"
                                        {...register("capacity")}
                                    />
                                </FormControl>
                            )}
                        </Stack>
                    </Box>
                    <Box my={1}>{submitButton}</Box>
                </form>
            </fieldset>
            {actionButtons}
        </Container>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
