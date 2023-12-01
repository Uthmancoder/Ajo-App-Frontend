import { Box, LinearProgress } from "@mui/material"
import { MdOutlineContactPhone } from "react-icons/md";
const Contact = () => {
    return (
        <div>
            <div className="my-5">
                <div className="mt-5">
                    <h1 className="text-center fW-bold fs-2 font-serif  mx-auto my-5">Feel Free Contact
                        Now Us </h1>
                    <div className=' mt-6 mx-auto' style={{ width: "100px" }}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress
                                sx={{
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: '#145de4',
                                    },
                                }}
                            />
                        </Box>
                    </div>

                    {/* form  */}
                    <form id="quote" className="w-full  px-8 md:px-0 container w-100">
                        <div className="row  ">
                            <div className="col-12 col-sm-6 col-md-6 my-2">
                                <input className="form-control " type="text" placeholder="Your Name" name="" id="" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 my-2">
                                <input className="form-control  " type="text" placeholder="Your Email" name="" id="" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 my-2">
                                <input className="form-control " type="number" placeholder="Your Phone" name="" id="" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 my-2">
                                <input className="form-control " type="text" placeholder="Subject" name="" id="" />
                            </div>
                        </div>
                        <textarea className="form-control my-2" placeholder="Message" name="" id="" cols="0" rows="6"></textarea>
                        <button className="w-full  my-2 text-white fW-bold  rounded-2 py-2 w-100" style={{ backgroundImage: "linear-gradient(to right, #145de4, #4259ef, #3d7de6)", border: "none"  }}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact