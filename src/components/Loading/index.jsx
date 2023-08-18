import { Box, CircularProgress } from "@mui/material"
import "./Loading.scss"
const Loading = () => {
  return (
    <div className="d-flex align-items-center gap-3">

    <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  <h2 className="mb-5 pb-3">Loading...</h2>
    </div>

    

  )
}

export default Loading