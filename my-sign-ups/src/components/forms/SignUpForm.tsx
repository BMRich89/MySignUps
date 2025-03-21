import { EventData } from "@/types/eventData";
import { Button, ButtonGroup, Grid2, TextField } from "@mui/material";
import { FieldArrayWithId, useFieldArray, UseFieldArrayAppend, UseFieldArrayRemove, useForm, UseFormRegister } from "react-hook-form";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type SignUpData = {
    SignUps: { email: string }[]
}

type SignUpFormInputs = {
    readonly: boolean,
    // fields: FieldArrayWithId<SignUpData, "SignUps", "id">[],
}

export default function SignUpForm({ readonly }: SignUpFormInputs) {

    //TODO: Add LIMITS
    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignUpData>({
        defaultValues: {
            SignUps: [{ email: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "SignUps",
    });
    
    const filteredFields = readonly ? fields.filter((f) => readonly) : fields;
    const addSignUp = () => {
        //TODO: update signup table
        append({ email: "" });
    };


    return (
        <>
            {filteredFields.map((field, index) => (
                <Grid2 container spacing={1} key={field.id} my={2}>
                    <Grid2 size={8}>
                        <Grid2 container spacing={1}>
                            <Grid2 size={8}>
                                <TextField
                                    required
                                    placeholder="Email"
                                    {...register(`SignUps.${index}.email`)} />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <ButtonGroup size="small">
                        {fields.length > 1 && (
                            <Button variant="contained" color="error" onClick={() => remove(index)}>
                                <RemoveCircleIcon />
                            </Button>
                        )}
                        <Button variant="contained" color="success" onClick={addSignUp}>
                            <AddCircleIcon />
                        </Button>
                    </ButtonGroup>
                </Grid2>
            ))}
        </>
    );
}