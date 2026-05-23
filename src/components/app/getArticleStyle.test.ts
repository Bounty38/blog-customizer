import { defaultArticleState } from '../../constants/articleProps';
import { getArticleStyle } from './getArticleStyle';

type Assert = {
	equal: (actual: unknown, expected: unknown) => void;
};

type Test = (name: string, fn: () => void) => void;

declare function require(moduleName: string): unknown;

const assert = require('node:assert/strict') as Assert;
const test = require('node:test') as Test;

test('maps article state options to css custom properties', () => {
	const style = getArticleStyle(defaultArticleState);

	assert.equal(style['--font-family'], 'Open Sans');
	assert.equal(style['--font-size'], '18px');
	assert.equal(style['--font-color'], '#000000');
	assert.equal(style['--container-width'], '1394px');
	assert.equal(style['--bg-color'], '#FFFFFF');
});
