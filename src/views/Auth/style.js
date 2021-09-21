import { makeStyles } from '@material-ui/styles'

const centeredAlignObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default  makeStyles(
    {
        Container: 
        {
            height: '100vh',
            width: '100%',
            flexDirection: 'column',
            ...centeredAlignObject
        },
        CardContainer:
        {
            flexDirection: 'column',
            backgroundColor: 'rgba(9, 132, 227, 0.5)',
            ...centeredAlignObject,
            maxWidth: 500,
            maxHeight: 400,
        },
        Title:
        {
            fontSize: '2rem'
        },
        TitleGridContainer:
        {
            ...centeredAlignObject
        },
        UserTextField:
        {
            width: '90%',
            color: '#0984e3'
        },
        PassTextField:
        {
            width: '90%',
            color: '#0984e3'
        },
        ButtonIniciar:
        {
            marginLeft: '.5rem',
            font: 'bold'
        },
        ButtonContainer:
        {
            marginTop: '.5rem'
        },
        Icon: 
        {
            fontSize: '1rem',
            color: '#0984e3'
        },
        logoCobertura:{
            maxWidth: '450px',
            margin: 'auto'
          },
    }
) 
