import { TableCell, Table, TableHead, TableRow, TableBody, Button, Typography, styled, Chip, Paper } from '@mui/material';

const StyledTable = styled(Table)({
    minWidth: 650,
})

const StatusChip = styled(Chip)(({ theme, status }) => ({
    backgroundColor: status === 'pending' ? theme.palette.warning.light : theme.palette.success.light,
    color: status === 'pending' ? theme.palette.warning.contrastText : theme.palette.success.contrastText,
    fontWeight: 600,
    textTransform: 'capitalize'
}))

const TableContainer = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    overflowX: 'auto'
}))

const Invoices = ({ invoices, removeInvoice }) => {
    return (
        <TableContainer>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Vendor</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices && Array.isArray(invoices) && invoices.length > 0 ? (
                        invoices.map(invoice => (
                            <TableRow key={invoice.id} hover>
                                <TableCell>{invoice.vendor}</TableCell>
                                <TableCell>{invoice.product}</TableCell>
                                <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <StatusChip label={invoice.action} status={invoice.action} />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        size="small"
                                        onClick={() => removeInvoice(invoice.id)}
                                    >
                                        Mark Done
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <Typography variant="subtitle1" color="textSecondary">
                                    No pending invoices
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}

export default Invoices;