import reduxLogger from './reduxLogger'
import bindPathParams from './bindPathParams'
import getUrl from './getUrl'
import getFirstViolatedPermission from './getFirstViolatedPermission'
import getInitials from './getInitials'
import isRouteActive from './isRouteActive'

export default async function () {
  return {
    reduxLogger: reduxLogger.bind(this),
    bindPathParams: bindPathParams.bind(this),
    getUrl: getUrl.bind(this),
    getFirstViolatedPermission: getFirstViolatedPermission.bind(this),
    getInitials: getInitials.bind(this),
    isRouteActive: isRouteActive.bind(this),
  }
}
