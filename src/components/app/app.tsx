import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';
import { getArticleStyle } from './getArticleStyle';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main className={styles.main} style={getArticleStyle(articleState)}>
			<ArticleParamsForm
				articleState={articleState}
				onApply={setArticleState}
			/>
			<Article />
		</main>
	);
};
