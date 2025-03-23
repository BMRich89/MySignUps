import { EventData } from "@/types/eventData";
import { Box, Button, ButtonGroup, Container, Grid2, TextField } from "@mui/material";
import { FieldArrayWithId, useFieldArray, UseFieldArrayAppend, UseFieldArrayRemove, useForm, UseFormRegister } from "react-hook-form";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SignUpData } from "@/types/signUps";
import { ObjectId } from "mongodb";
import { read } from "fs";



type SignUpFormInputs = {
    eventId: ObjectId
    readonly: boolean,
    readonlyUpdate: (val: boolean) => void,
    onSubmit: (data: any) => void;
    // fields: FieldArrayWithId<SignUpData, "SignUps", "id">[],
}

export default function SignUpForm({ readonly, eventId, onSubmit, readonlyUpdate }: SignUpFormInputs) {

    //TODO: Add LIMITS
    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignUpData>({
        defaultValues: {
            signUps: [{ email: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "signUps",
    });

    const filteredFields = readonly ? fields.filter((f) => readonly) : fields;
    const addSignUp = () => {
        //TODO: update signup table
        append({ email: "" });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={readonly}>
                <Box minHeight={'40vh'}>
                    <input type="hidden" {...register("eventId")} value={eventId.toString()} />
                    {filteredFields.map((field, index) => (
                        <Grid2 container spacing={1} key={field.id} my={2}>
                            <Grid2 size={8}>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={8}>
                                        <TextField
                                            required
                                            placeholder="Email"
                                            {...register(`signUps.${index}.email`)} />
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                            <ButtonGroup size="small">
                                {fields.length > 1 && (
                                    <Button variant="contained" color="error" onClick={() => remove(index)}>
                                        <RemoveCircleIcon />
                                    </Button>
                                )}
                                {!readonly && <Button variant="contained" color="success" onClick={addSignUp}>
                                    <AddCircleIcon />
                                </Button>}
                            </ButtonGroup>
                        </Grid2>
                    ))}
                </Box>
            </fieldset>
            {!readonly && <Button variant="contained" color="success" type="submit" fullWidth>
                Update Sign Ups
            </Button>
            }
            {readonly && <Button variant="contained" color="info" fullWidth onClick={() => readonlyUpdate(false)}>
                Add Sign Ups
            </Button>
            }
        </form>
    );
}