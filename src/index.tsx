import { createRoot } from 'react-dom/client';
import { CSSProperties, StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [appliedState, setAppliedState] = useState<ArticleStateType>(formState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={setFormState}
				setAppliedState={setAppliedState}
			/>
			<Article appliedState={appliedState} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
