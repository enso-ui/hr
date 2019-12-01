<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters animated fadeIn">
            <enso-form ref="form"
                class="box has-background-light raises-on-hover animated fadeIn"
                @loaded="ready = true"/>
            <accessories v-if="ready">
                <template slot-scope="{ count }">
                    <tab id="Files" keep-alive>
                        <div class="column  is-centered">
                            <documents :id="$route.params.employee"
                                       ref="documents"
                                       type="App\Models\Employee"
                                       @update="$set(count, 'Files', $refs.documents.count)"/>
                        </div>
                    </tab>
                    <tab id="Comments" keep-alive>
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <comments :id="$route.params.employee"
                                    ref="comments"
                                    type="App\Models\Employee"
                                    @update="$set(count, 'Comments', $refs.comments.count)"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>

import { EnsoForm, Tab } from '@enso-ui/bulma';
import { Accessories, Documents, Comments } from '@enso-ui/accessories/bulma';

export default {
    components: {
        EnsoForm, Accessories, Documents, Tab, Comments,
    },

    data() {
        return {
            ready: false,
        };
    },
};

</script>
