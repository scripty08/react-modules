import React, { useEffect } from 'react';
import 'react-simple-flex-grid/lib/main.css';
import { useStore } from '@scripty/react-store';
import { cleanPlacements, getCount, getItems, Modules, updatePlacements } from '../../src';
import { Article } from '@scripty/react-articles';

export const Example = () => {
    const { modulesStore } = useStore('modulesStore');
    const { articlesStore } = useStore('articlesStore');
    const records = modulesStore.getAt(0);
    const modules = records.get('modules');
    const placements = records.get('placements');
    const articles = articlesStore.getAt(0);

    useEffect(() => {
        modulesStore.proxy.findModules({assignment: 'Dashboard'});
    }, []);

    useEffect(() => {
        updatePlacement(modules);
    }, [modules]);

    const updatePlacement = (modules, newItem) => {
        const props = {
            onOkBtnClick: onOkBtnClick,
            onCancelBtnClick,
            onChange: onArticleChange,
            showEditBtn: true
        };

        let updatedPlacements = updatePlacements(modules, placements, {Article}, props)
        records.set({ placements: updatedPlacements });
    }

    const onOkBtnClick = () => {
        records.set({ placements });

        if (articles.action === 'edit') {
            let updatedModules = modules.map((record) => {
                if (record.module_id === articles._id) {
                    record.plugin[0] = articles;
                    return record;
                } else {
                    return record;
                }
            });

            return updatePlacement(updatedModules)
        }

        modules.push({
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

        return updatePlacement(modules);
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

        await modulesStore.proxy.updatePlacements({assignment: 'Dashboard', placements: cleanedPlacements})
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
        updatePlacement(modules, newItem[0]);
        records.set({ placements });
    }

    return (
        <Modules
            placements={placements}
            setPlacements={(placements) => { records.set({ placements }) }}
            onSaveBtnClick={onSaveBtnClick}
            onAddBtnClick={onAddBtnClick}
            editing={true}
            modules={['Article']}
        />
    )
}
