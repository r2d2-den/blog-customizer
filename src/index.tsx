import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSetDataPage = (data: ArticleStateType) => {
		setArticleState(data);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm setDataPage={handleSetDataPage} />
			<Article />
		</div>
	);
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
