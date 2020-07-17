import React, { useEffect, useState } from 'react';
import 'react-simple-flex-grid/lib/main.css';
import { useStore } from '@scripty/react-store';
import { cleanPlacements, getCount, getItems, Modules, updatePlacements } from '../../src';
import { Article } from '@scripty/react-articles';

export const Example = () => {

    const { modulesStore } = useStore('modulesStore');
    const { articlesStore } = useStore('articlesStore');
    const modules = modulesStore.getAt(0).get('modules');
    const layout = modulesStore.getAt(0).get('layout');
    const articles = articlesStore.getAt(0);
    const [ placements, setPlacements ] = useState(layout);

    useEffect(() => {
        modulesStore.proxy.findModules({assignment: 'Dashboard'});
    }, []);

    useEffect(() => {
        updateLayout(modules);
    }, [modules]);

    const updateLayout = (modules, newItem) => {

        if (newItem) {
            layout[1].unshift({ id: newItem.id });
        }

        const props = {
            onOkBtnClick: onOkBtnClick,
            onCancelBtnClick,
            onChange: onArticleChange,
            showEditBtn: true
        }

        let updatedPlacements = updatePlacements(modules, layout, {Article}, props)
        return setPlacements(updatedPlacements);
    }

    const onOkBtnClick = () => {
        modulesStore.getAt(0).set('layout', layout);

        if (articles.action === 'edit') {
            let store = modulesStore.getAt(0);

            let all = store.modules.map((record) => {
                if (record.module_id === articles._id) {
                    record.plugin[0] = articles;
                    return record;
                } else {
                    return record;
                }
            });

            return updateLayout(all)
        }


        let store = modulesStore.getAt(0);
        store.modules.push({
            assignment: {
                type: 'selected', value: ['Dashboard']
            },
            type: 'Article',
            plugin: [{
                title: articles.title,
                html: articles.html,
                layout_id: articles.layout_id
            }]
        });

        return updateLayout(store.modules);
    }

    const onCancelBtnClick = () => {
        console.log('cancel', '  <------------');
    }

    const onArticleChange = ({_id, title, html, layout_id}) => {

        let filtered = modules.filter((module) => {
            return module.module_id === _id
        });

        //if editing
        if (filtered.length > 0) {
            return articles.set({
                ...filtered[0].plugin[0],
                action: 'edit',
                _id, title, html, layout_id
            });
        }

        articles.set({_id, title, html, layout_id});
    }

    const onSaveBtnClick = async (state, setState) => {
        const cleanedPlacements = cleanPlacements(placements);
        let module = modules[modules.length -1];

        if (articles.action === 'edit') {
            let response = await articlesStore.proxy.update(articles);
            module.module_id = response.entries[0]._id;
            await modulesStore.proxy.updateModule(module);
        }

        if (articles.action === 'new') {
            delete articles['_id'];
            let response = await articlesStore.proxy.update(articles);
            module.module_id = response.entries[0]._id;
            module.plugin = [{_id: response.entries[0]._id}];
            await modulesStore.proxy.updateModule(module);
        }

        await modulesStore.proxy.updateLayout({assignment: 'Dashboard', layout: cleanedPlacements})
    };

    const onAddBtnClick = (type) => {

        articles.set({action: 'new'});

        let newItem = getItems(1, getCount(placements), (
            <Article
                title={articles.title}
                html={articles.html}
                layout_id={'item-' + getCount(placements)}
                edit={true}
                showEditBtn={true}
                onChange={onArticleChange}
                onOkBtnClick={onOkBtnClick}
                onCancelBtnClick={onCancelBtnClick}
            />
        ));

        placements[1].unshift(newItem[0]);
        updateLayout(modules, newItem[0]);
        setPlacements(placements);
        modulesStore.getAt(0).set('layout', placements);
    }

    return (
        <Modules
            state={placements}
            setState={setPlacements}
            onSaveBtnClick={onSaveBtnClick}
            onAddBtnClick={onAddBtnClick}
            editing={true}
            modules={['Article', 'Navigation']}
        />
    )
}
