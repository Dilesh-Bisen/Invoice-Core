import { useState, useEffect } from "react";
import Header from '../components/Header';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Invoices from '../components/Invoices';
import AddInvoice from "../components/AddInvoice";
import { getAllInvoices, deleteInvoice } from "../services/api";

const Home = () => {
    const [invoices, setInvoices] = useState([]);
    const [addInvoice, setAddInvoice] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await getAllInvoices();
                if (response && response.data) {
                    setInvoices(response.data);
                }
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [addInvoice]);

    const removeInvoice = async (id) => {
        await deleteInvoice(id);
        setInvoices(invoices.filter(invoice => invoice.id !== id));
    }

    return (
        <>
            <Header />
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                        Invoice Dashboard
                    </Typography>
                    {!addInvoice && (
                        <Button
                            variant="contained"
                            onClick={() => setAddInvoice(true)}
                            sx={{ minWidth: 150 }}
                        >
                            Add Invoice
                        </Button>
                    )}
                </Box>
                
                {addInvoice ? (
                    <AddInvoice setAddInvoice={setAddInvoice} />
                ) : loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Invoices
                        removeInvoice={removeInvoice}
                        invoices={invoices}
                    />
                )}
            </Box>
        </>
    )
}

export default Home;