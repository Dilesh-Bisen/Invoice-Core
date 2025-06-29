import { useState } from "react";
import { TextField, Typography, Box, Button, styled, Grid, InputAdornment } from "@mui/material";
import { saveInvoice } from "../services/api";

const Component = styled(Box)(({ theme }) => ({
    marginTop: 20,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    '& > p': {
        fontSize: 26,
        marginBottom: 20,
        fontWeight: 600,
        color: theme.palette.text.primary
    }
}));

const defaultObj = {
    vendor: '',
    product: '',
    amount: 0,
    date: '',
    action: 'pending'
}

const AddInvoice = ({ setAddInvoice }) => {
    const [invoice, setInvoice] = useState(defaultObj);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let temp = {};
        temp.vendor = invoice.vendor ? "" : "Vendor is required";
        temp.product = invoice.product ? "" : "Product is required";
        temp.amount = invoice.amount > 0 ? "" : "Amount must be greater than 0";
        temp.date = invoice.date ? "" : "Date is required";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    const onValueChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value })
    }

    const addNewInvoice = async () => {
        if (validate()) {
            await saveInvoice({ 
                ...invoice, 
                amount: Number(invoice['amount'])
            });
            setAddInvoice(false);
        }
    }

    return (
        <Component>
            <Typography>Add New Invoice</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Vendor"
                        name="vendor"
                        variant="outlined"
                        value={invoice.vendor}
                        onChange={onValueChange}
                        error={!!errors.vendor}
                        helperText={errors.vendor}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Product"
                        name="product"
                        variant="outlined"
                        value={invoice.product}
                        onChange={onValueChange}
                        error={!!errors.product}
                        helperText={errors.product}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Amount"
                        name="amount"
                        type="number"
                        variant="outlined"
                        value={invoice.amount}
                        onChange={onValueChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        variant="outlined"
                        value={invoice.date}
                        onChange={onValueChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.date}
                        helperText={errors.date}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => setAddInvoice(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={addNewInvoice}
                        sx={{ minWidth: 120 }}
                    >
                        Save Invoice
                    </Button>
                </Grid>
            </Grid>
        </Component>
    )
}

export default AddInvoice;