import React from 'react';
import LockIcon from '@material-ui/icons/Lock';
import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import imageAuth from '../assets/auth.png';
import { useAuth0 } from '../react-auth0-spa';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        minHeight: '100vh',
    },
    content: {
        flexGrow: 1,
        maxWidth: '100%',
        overflowX: 'hidden',
        paddingTop: 64,
    },
    card: {
        width: 780,
        minHeight: 400,
        overflow: 'visible',
        maxWidth: '100%',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
            width: '50%'
        }
    },
    cardContent: {
        padding: '80px 20px 20px 20px',
        textAlign: 'center'
    },
    media: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    h3: {
        marginBottom: 90,
        fontSize: 30,
        fontFamily: 'SegoeUISemiBold',
        color: '#263238',
        textAlign: 'center'
    },
    button: {
        background: 'green',
        color: '#fff',
        fontFamily: 'SegoeUIRegular',
        '&:hover' : {
            background: '#43a047'
        }
    },
    icon: {
        background: 'green',
        color: '#fff',
        borderRadius: '5px',
        padding: '8px',
        position: 'absolute',
        top: -24,
        left: -24,
        height: 48,
        width: 48,
        fontSize: 28
    }
}))

const Login = () => {
    const classes = useStyles();
    const { loginWithRedirect } = useAuth0();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <LockIcon className={classes.icon}/>
                <Typography
                    className={classes.h3}
                    variant="h3"
                >
                    Sign in on the internal platform
                </Typography>
                <Button
                    onClick={() => loginWithRedirect({})}
                    size="large"
                    className={classes.button}
                    variant="contained"
                >
                    Sign In
                </Button>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={imageAuth}
            >

            </CardMedia>
        </Card>
    )
}

export default Login;