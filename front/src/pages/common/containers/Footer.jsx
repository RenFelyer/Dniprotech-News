import { ReactComponent as Logo } from "../../../assets/images/logo-footer.svg";
import { ReactComponent as FaceBook } from "../../../assets/images/soc-facebook.svg";
import { ReactComponent as Instagram } from "../../../assets/images/soc-instagram.svg";
import { ReactComponent as YouTube } from "../../../assets/images/soc-youtube.svg";

const Footer = () => {
	return (
		<footer className="bg-footerbg text-lights font-europe text-lg select-none">
			<div className="max-w-[1152px] mx-auto px-3">
				<div className="md:flex border-b border-balance/20 py-7">
					<div className="h-[78px] mr-2"> <Logo /></div>
					<div className="md:mt-0 mt-2 w-full flex items-start justify-between font-europe">
						<div>
							<div className="font-bold">Корисні посилання</div>
							<ul className="text-md underline text-lights/60">
								<li><a target="_blank" rel="noopener noreferrer" href="https://www.nmu.org.ua/">Cторінка університету</a></li>
								<li><a target="_blank" rel="noopener noreferrer" href="https://do.nmu.org.ua/">Дистанційна освіта</a></li>
							</ul>
						</div>

						<div>
							<div className="font-bold mb-2">Соціальні мережі</div>
							<ul className="flex justify-between h-8">
								<li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/dniprotech?igshid=NTc4MTIwNjQ2YQ=="><Instagram /></a></li>
								<li><a target="_blank" rel="noopener noreferrer" href="https://m.facebook.com/ntudp"><FaceBook /></a></li>
								<li><a target="_blank" rel="noopener noreferrer" href="https://youtube.com/@dniprotech"><YouTube /></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;