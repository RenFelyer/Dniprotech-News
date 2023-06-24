
const CardGreeting = () => {
	return (
		<div className="bg-info/70 w-[270px] select-none rounded-t-lg p-2">
			<div className="flex flex-col gap-2 w-[255px] text-lights">
				<div className="flex flex-col gap-1 pb-2 border-b border-white/60">
					<p className="text-lg font-bold">Dnipro University of Technology</p>
					<p>Compliance with the Time</p>
				</div>
				<div className="flex flex-col gap-3">
					<p>Дніпровська політехніка - кращий ЗВО регіону!</p>
					<p>Наш університет дбає про те, щоб студентське життя було яскравим та насиченим, а рівень освіти відповідав сучасним стандартам навіть під час дистанційної освіти.  </p>
					<p>Залишайтесь в курсі головних подій в Дніпровській політехніці!</p>
				</div>
			</div>
		</div>
	);
}

export default CardGreeting;