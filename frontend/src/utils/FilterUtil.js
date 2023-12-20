let obj = null;
let filter = null;

function filterWithTitleMovie() {
	return obj.title.toUpperCase().startsWith(filter.title.toUpperCase());
}

function filterWithTitle() {
	return obj.title.toUpperCase().includes(filter.title.toUpperCase());
}

function filterWithGenre() {
	for (let genre of filter.genre) {
		if (obj.genres.includes(genre)) {
			return true;
		}
	}
	return false;
}

function filterWithDone(done) {
	if (filter.done) {
		return done === filter.done;
	}
	return true;
}

function filterWithSeen() {
	if (filter.seen) {
		return !obj.seen === filter.seen;
	}
	return true;
}

function filterWithOwned() {
	if (filter.owned) {
		return !obj.owned === filter.owned;
	}
	return true;
}

function filterWithRelease() {
	return filter.release ? releaseInTheFuture() : true;
}

function filterWithLiza() {
	if (filter.liza) {
		return obj.liza === filter.liza;
	}
	return true;
}

function releaseInTheFuture() {
	return Date.parse(obj.release_date) > new Date().getTime();
}

export function filterMovie(paramMovie, paramFilter) {
	obj = paramMovie;
	filter = paramFilter;
	return filterWithTitleMovie() && filterWithGenre() && filterWithSeen() && filterWithOwned() && filterWithRelease() && filterWithLiza();
}

export function filterGame(paramGame, paramFilter) {
	obj = paramGame;
	filter = paramFilter;
	return filterWithTitle();

}