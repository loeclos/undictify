import Image from 'next/image';
import './loader.css';

export default function Loader() {
    return (
        <div id="pre-load" className="loader">
            <div className="loader-inner">
                <div className="loader-logo">
                    <Image
                        src="/undictify.png"
                        alt="logo"
                        width={508}
                        height={508}
                    />
                </div>
                <div className="box" />
                <div className="box" />
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </div>
        </div>
    );
}
