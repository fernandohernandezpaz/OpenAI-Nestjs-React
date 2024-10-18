import { OrthographyUseCaseResponseInterface } from '../../../interfaces/orthography-use-case-response.interface.ts';

export const GptOrthographyMessage = ({
	errors,
	message,
	userScore,
}: OrthographyUseCaseResponseInterface) => {
	return (
		<div className={'col-start-1 col-end-8 p-3 rounded-lg'}>
			<div className={'flex flex-row items-start'}>
				<div
					className={
						'flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink'
					}
				>
					AI
				</div>
				<div
					className={
						'relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'
					}
				>
					<h3>Score: {userScore}</h3>
					<p>Message: {message}</p>
					{errors.length > 0 ? (
						<>
							<h5>Errors: </h5>
							<ul>
								{errors.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						</>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};
