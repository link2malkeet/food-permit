import { Context } from 'koa';
import { APIContext, APIState } from '../types';
import { Middleware, ParameterizedContext } from 'koa';
const loadJsonFile = require('load-json-file');
const GEO_ATTRIBUTES = ['LocationDescription', 'Address', 'Latitude', 'Longitude', 'locationid']
type ReadDataMiddleware<T> = (ctx: Context, next: () => Promise<any>) => Promise<T>;
export const readData: ReadDataMiddleware<void> = async (ctx, next) => {
    const file = `${__dirname}/rows.json`
    const allData = await loadJsonFile(file)
    // console.log('obj:', allData.meta.view.columns)
    // const data: RowData[][] = [];
    // console.log('allData.data:', allData.data.length)
    const items = [];
    for (const each of allData.data) {
        const item = new Map<string, string>();
        // console.log('each:', each);
        for (let i = 0; i < each.length; i++) {
            // console.log(allData.meta.view.columns[i].name, ':', each[i])
            // console.log('e:', each[i]);
            item.set(allData.meta.view.columns[i].name, each[i])
        }
        items.push(item);
    }
    // console.log('data:items:size', items.length)
    // console.log('data:items:', items[0])
    const table1 = [];
    const table2 = [];
    for (const item of items) {
        table1.push(item.get('Address'))
        const table2Items: { [key in string]: string } = {};
        for (const table2Attr of GEO_ATTRIBUTES) {
            table2Items[table2Attr] = item.get(table2Attr)!
        }
        table2.push(table2Items)
    }
    ctx.state.table1 = table1;
    ctx.state.table2 = table2;
    await next();
}
