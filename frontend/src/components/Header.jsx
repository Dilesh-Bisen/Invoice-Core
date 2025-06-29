import { AppBar, Toolbar, Typography, styled } from '@mui/material';

const LogoContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const LogoIcon = styled('svg')(({ theme }) => ({
    width: 50,
    height: 50,
    marginRight: theme.spacing(0),
    fill: 'url(#gradient)',
}));

const Header = () => {
    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <LogoContainer>
                    <LogoIcon viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ADD8E6' }} />
                                <stop offset="100%" style={{ stopColor: '#87CEEB' }} />
                            </linearGradient>
                        </defs>
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M6 6h12v10H6V6zm2 2v6h8V8H8zm2 2h4v2h-4v-2z" fill="white" />
                        <path d="M10 14v2h4v-2" stroke="white" strokeWidth="1" strokeLinecap="round" />
                        <path d="M12 6v12" stroke="#ADD8E6" strokeWidth="2" strokeLinecap="round" />
                    </LogoIcon>
                    <Typography variant="h6" color="inherit" noWrap sx={{ fontWeight: 700 }}>
                        InvoiceCore
                    </Typography>
                </LogoContainer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;