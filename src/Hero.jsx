import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return <div className="px-5 py-5 flex justify-center items-center h-screen w-full bg-[#1c1c1c]">
        <div className="relative rounded-2xl w-full h-full flex flex-col justify-center items-center gap-8 bg-[#ff0000] overflow-hidden m-0">
            <h4 className="absolute top-0 left-0 p-4 text-white">v.0.0.1</h4>
            <div className="z-2 flex flex-col items-center">
                <h1 className="font-[Ponderosa] text-white text-7xl">HAVOC</h1>
                <p className="font-[Satoshi] text-white/80">Created by <a className="underline" href="">тк.ryoichi</a></p>
            </div>
            <button 
            onClick={() => navigate('/username')}
            className="z-3 bg-[#fff] text-black text-md px-10 py-5 rounded-full">Join the fun</button>
            <img className="absolute bottom-[-10rem] fill-red" src="/burn.svg" alt="Logo" />
        </div>
    </div>
}

export default Hero