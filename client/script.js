var app = new Vue({
    el: '#app',
    data: {
        isRefreshing: false,
        refreshIntervalId: undefined,
        refreshTime: 60000, //5 * 60 * 1000, // 5 minutes
        repositories: []
    },
    methods: {
        refreshRepos: function () {
            let vm = this
            const uri = '/api/'
            fetch(uri).then(function (resp) {
                return resp.json();
            }).then(function (json) {
                vm.repositories = json
            });
        },

        toggleRefreshInterval: function () {
            let vm = this
            if (vm.isRefreshing) {
                clearInterval(vm.refreshIntervalId)
                vm.isRefreshing = false
                vm.refreshIntervalId = undefined
            } else {
                // Trigger the refresh of the repos right now
                this.refreshRepos()
                // start a refresh interval
                vm.refreshIntervalId = setInterval(() => {
                    this.refreshRepos()
                }, vm.refreshTime);
                vm.isRefreshing = true
            }
        }
            
    }
})
