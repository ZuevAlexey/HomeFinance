To fix the error

$ expo start
Starting project at E:\Projects\test
Expo DevTools is running at http://localhost:19002
Opening DevTools in the browser... (press shift-d to disable)
error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

Metro Bundler process exited with code 1
Error: Metro Bundler process exited with code 1
    at ChildProcess.<anonymous> (C:\@expo\xdl@56.2.7\src\Project.ts:1804:16)
    at Object.onceWrapper (events.js:300:26)
    at ChildProcess.emit (events.js:210:5)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:272:12)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.




FIX:
Got this issue today on windows, but don't need to downgrade node, just as discussed on stackoverflow just need to change some hashes on your project:
\node_modules\metro-config\src\defaults\blacklist.js

var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
change to:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];