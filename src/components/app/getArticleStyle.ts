import type { CSSProperties } from 'react';

import type { ArticleStateType } from '../../constants/articleProps';

type ArticleStyle = CSSProperties & {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

export const getArticleStyle = (
	articleState: ArticleStateType
): ArticleStyle => ({
	'--font-family': articleState.fontFamilyOption.value,
	'--font-size': articleState.fontSizeOption.value,
	'--font-color': articleState.fontColor.value,
	'--container-width': articleState.contentWidth.value,
	'--bg-color': articleState.backgroundColor.value,
});
