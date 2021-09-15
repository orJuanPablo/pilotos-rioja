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
            background: '#d2dae2',
            ...centeredAlignObject
        },
        CardContainer:
        {
            flexDirection: 'column',
            ...centeredAlignObject,
            width: 500,
            height: 400,
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
        }
    }
) 
