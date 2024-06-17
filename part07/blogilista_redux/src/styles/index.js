import { makeStyles } from '@fluentui/react-components'

export const useStyles = makeStyles({
  root: {
    marginLeft: '30%',
    marginRight: '30%',
    width: '40%',
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
  },
  navbarUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  border: {
    border: '2px solid',
    borderRadius: '10px',
    marginTop: '4px',
    padding: '10px',
  },
})
