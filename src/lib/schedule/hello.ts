// import { provide, schedule, CommonSchedule, Context } from 'midway';

// @provide()
// @schedule({
//   interval: 2333, // 2.333s 间隔
//   type: 'worker', // 指定某一个 worker 执行
// })
// export class HelloCron implements CommonSchedule {

//   // 定时执行的具体任务
//   async exec(ctx: Context) {
//     console.log(`[Avatar]: schedule`);
//     ctx.logger.info(process.pid, 'hello');
//   }
// }
