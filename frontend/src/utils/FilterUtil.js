let obj = null;
let filter = null;

function filterWithTitleMovie() {
	return obj.title.toUpperCase().startsWith(filter.title.toUpperCase());
}

function filterWithTitle() {
	return obj.title.toUpperCase().includes(filter.title.toUpperCase());
}

function filterWithOwned() {
	if (filter.owned !== null) {
		return obj.owned === filter.owned;
	}
	return true;
}

function filterWithSeen() {
	if (filter.seen !== null) {
		return obj.seen === filter.seen;
	}
	return true;
}

function filterWithRelease() {
	return filter.release ? releaseInTheFuture() : true;
}

function filterWithSpecial() {
	if (filter.special !== null) {
		return obj.liza === filter.special;
	}
	return true;
}

function releaseInTheFuture() {
	return Date.parse(obj.release_date) > new Date().getTime();
}

export function filterMovie(paramMovie, paramFilter) {
	obj = paramMovie;
	filter = paramFilter;
	return filterWithTitleMovie() && filterWithOwned() && filterWithSeen() && filterWithRelease() && filterWithSpecial();
}

export function filterGame(paramGame, paramFilter) {
	obj = paramGame;
	filter = paramFilter;
	return filterWithTitle();

}