import { expect, test } from '@fixtures';
import { TextBoxPo } from '@pages';
import { USER_0_DATA, USERS_LIST } from 'src/ui/data';
/*
This is an example spec for educational purposes
This spec holds SAME tests written in different levels of structure/readability and quality
The tests are the SAME, you can follow along what changes

Test_1: Fill-out all the fields and check if the output is correct.
Test_2: Check email field for:
a. does it have correct name
b. placeholder
c. field validation
d. output */
test.describe('Text Box', () => {
  test.describe('LEVEL 1', () => {
    //Level 1 implementation does not look very good and is not really readable at all
    //Also we have to give the same Selector for some elements multiple times
    //We are repeating ourselves a lot
    test('Fill out ALL the form', async ({ page }) => {
      //navigating to the page
      await page.goto('https://demoqa.com/text-box');
      //filling out all the fields
      await page.locator('input[id="userName"]').fill('Robert');
      await page.locator('input[id="userEmail"]').fill('rob@gmail.com');
      await page.locator('textarea[id="currentAddress"]').fill('str1');
      await page.locator('textarea[id="permanentAddress"]').fill('str2');
      await page.locator('button[id="submit"]').click();
      //checking
      await expect(page.locator('div[id="output"]')).toHaveText(
        'Name:RobertEmail:rob@gmail.comCurrent Address :str1 Permananet Address :str2'
      );
    });
    test('Email field checks', async ({ page }) => {
      //navigating to the page
      await page.goto('https://demoqa.com/text-box');
      //(a) checking if field name is Email
      await expect(page.locator('label[id="userEmail-label"]')).toHaveText('Email');
      //(b) checking if placeholder is 'name@example.com'
      const placeholder = await page.locator('input[id="userEmail"]').getAttribute('placeholder');
      expect(placeholder).toEqual('name@example.com');
      //(c) checking for validation
      await page.locator('input[id="userEmail"]').fill('notValidEmailFormat');
      await page.locator('button[id="submit"]').click(); //this is needed to trigger validation
      const classAtr = await page.locator('input[id="userEmail"]').getAttribute('class');
      expect(classAtr.includes('field-error')).toEqual(true);
      //(d) checking the output
      await page.locator('input[id="userEmail"]').fill('rob@gmail.com');
      await page.locator('button[id="submit"]').click();
      await expect(page.locator('div[id="output"]')).toHaveText('Email:rob@gmail.com');
    });
  });
  test.describe('LEVEL 2', () => {
    /*
        Level 2 Changes:
        1. We added a test.beforeEach hook function that runs before every test and placed navigation into it
        Result: No need to put navigation into tests (what we put in beforeEach will run BEFORE EACH test)
        Some more information: https://playwright.dev/docs/api/class-test#test-before-each-1
        2. We added the 'baseUrl' into the project section (ui-main) of configuration file (playwright.config.ts)
        Result: No need for full URL, we just need to provide a resource '/text-box'
        Also it is easy to run the same tests on dev or test environments
        Some more information: https://playwright.dev/docs/test-webserver#adding-a-baseurl
        */

    test.beforeEach(async ({ page }) => {
      await page.goto('/text-box');
    });
    test('Fill out ALL the form', async ({ page }) => {
      //navigation is done in beforeEach hook now (everything else is the same as Level 1)

      //filling out all the fields
      await page.locator('input[id="userName"]').fill('Robert');
      await page.locator('input[id="userEmail"]').fill('rob@gmail.com');
      await page.locator('textarea[id="currentAddress"]').fill('str1');
      await page.locator('textarea[id="permanentAddress"]').fill('str2');
      await page.locator('button[id="submit"]').click();
      //checking
      await expect(page.locator('div[id="output"]')).toHaveText(
        'Name:RobertEmail:rob@gmail.comCurrent Address :str1 Permananet Address :str2'
      );
    });
    test('Email field checks', async ({ page }) => {
      //navigation is done in beforeEach hook now (everything else is the same as Level 1)
      //(a) checking if field name is Email
      await expect(page.locator('label[id="userEmail-label"]')).toHaveText('Email');
      //(b) checking if placeholder is 'name@example.com'
      const placeholder = await page.locator('input[id="userEmail"]').getAttribute('placeholder');
      expect(placeholder).toEqual('name@example.com');
      //(c) checking for validation
      await page.locator('input[id="userEmail"]').fill('notValidEmailFormat');
      await page.locator('button[id="submit"]').click(); //this is needed to trigger validation
      const classAtr = await page.locator('input[id="userEmail"]').getAttribute('class');
      expect(classAtr.includes('field-error')).toEqual(true);
      //(d) checking the output
      await page.locator('input[id="userEmail"]').fill('rob@gmail.com');
      await page.locator('button[id="submit"]').click();
      await expect(page.locator('div[id="output"]')).toHaveText('Email:rob@gmail.com');
    });
  });
  test.describe('LEVEL 3', () => {
    /*
        Level 3 Changes:
        1. We added a Page Object for text-box page ('ui/po/pages/text-box.po.ts')
        In 'text-box.po.ts', for now you don't need to understand everything .
        Take a look at lines 8 - 17 for the moment.
        Result:
        a. 'elements/selectors' are now stored in one place.
        (if this element changes on the web page we will only need to chane it in 1 place to fix the tests)
        Some more information: https://playwright.dev/docs/pom
        There are many more benefits of using Page Object Model
        b. the test became much mor readable
        */

    test.beforeEach(async ({ page }) => {
      await page.goto('/text-box');
    });
    test('Fill out ALL the form', async ({ page }) => {
      //filling out all the fields
      const textBoxPo = new TextBoxPo(page); // we are creating an instance of TextBoxPo class

      await textBoxPo.userName.fill('Robert');
      await textBoxPo.email.fill('rob@gmail.com');
      await textBoxPo.curAddress.fill('str1');
      await textBoxPo.perAddress.fill('str2');
      await textBoxPo.submitBtn.click();
      //checking
      await expect(textBoxPo.output).toHaveText('Name:RobertEmail:rob@gmail.comCurrent Address :str1 Permananet Address :str2');
    });
    test('Email field checks', async ({ page }) => {
      const textBoxPo = new TextBoxPo(page); // we are creating an instance of TextBoxPo class
      //(a) checking if field name is Email
      await expect(textBoxPo.emailLabel).toHaveText('Email');
      //(b) checking if placeholder is 'name@example.com'
      const placeholder = await textBoxPo.email.getAttribute('placeholder');
      expect(placeholder).toEqual('name@example.com');
      //(c) checking for validation
      await textBoxPo.email.fill('notValidEmailFormat');
      await textBoxPo.submitBtn.click(); //this is needed to trigger validation
      const classAtr = await textBoxPo.email.getAttribute('class');
      expect(classAtr.includes('field-error')).toEqual(true);
      //(d) checking the output
      await textBoxPo.email.fill('rob@gmail.com');
      await textBoxPo.submitBtn.click();
      await expect(textBoxPo.output).toHaveText('Email:rob@gmail.com');
    });
  });
  test.describe('LEVEL 4', () => {
    /*
        Level 4 Changes:
        1. We added test fixtures:
        Until now we were creating the instance of TextBoxPo directly in the test:
                    const textBoxPo = new TextBoxPo(page)
        Now we are getting the instance from fixtures (on the right from test name 'textBox')
        Some more information: https://playwright.dev/docs/test-fixtures

        Again you don't need to know everything how it works at the moment
        What you need to know is how to create a new fixture:
        a. Create a Page Object (example: 'ui/po/pages/text-box.po.ts')
        b. Add it to the index file ('ui/po/pages/index/ts')
        c. Add the fixture in fixture file ('fixtures/page-fixtures.ts')
                example: for test-box lines: 10, 21-23
        d. use the fixture in your test
                example:  test('name of the test', async ({fixtureName}) =>{
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
      // we can use the .visit() function from the BasePage
      // This is possible coz we provide the resource url in the constructor of TextBoxPo class
      // Some information: https://www.typescripttutorial.net/typescript-tutorial/typescript-inheritance/
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      await textBox.userName.fill('Robert');
      await textBox.email.fill('rob@gmail.com');
      await textBox.curAddress.fill('str1');
      await textBox.perAddress.fill('str2');
      await textBox.submitBtn.click();
      //checking
      await expect(textBox.output).toHaveText('Name:RobertEmail:rob@gmail.comCurrent Address :str1 Permananet Address :str2');
    });
    test('Email field checks', async ({ textBox }) => {
      //(a) checking if field name is Email
      await expect(textBox.emailLabel).toHaveText('Email');
      //(b) checking if placeholder is 'name@example.com'
      const placeholder = await textBox.email.getAttribute('placeholder');
      expect(placeholder).toEqual('name@example.com');
      //(c) checking for validation
      await textBox.email.fill('notValidEmailFormat');
      await textBox.submitBtn.click(); //this is needed to trigger validation
      const classAtr = await textBox.email.getAttribute('class');
      expect(classAtr.includes('field-error')).toEqual(true);
      //(d) checking the output
      await textBox.email.fill('rob@gmail.com');
      await textBox.submitBtn.click();
      await expect(textBox.output).toHaveText('Email:rob@gmail.com');
    });
  });
  test.describe('LEVEL 5', () => {
    /*
        Level 5 Changes:
        1. Adding test Steps
        This makes everything much more readable in the report
        Some more info https://playwright.dev/docs/api/class-test#test-step
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      await textBox.userName.fill('Robert');
      await textBox.email.fill('rob@gmail.com');
      await textBox.curAddress.fill('str1');
      await textBox.perAddress.fill('str2');
      await textBox.submitBtn.click();
      //checking
      await expect(textBox.output).toHaveText('Name:RobertEmail:rob@gmail.comCurrent Address :str1 Permananet Address :str2');
    });
    test('Email field checks', async ({ textBox }) => {
      await test.step('checking if field name is correct', async () => {
        await expect(textBox.emailLabel).toHaveText('Email');
      });
      await test.step('checking if placeholder is correct', async () => {
        const placeholder = await textBox.email.getAttribute('placeholder');
        expect(placeholder).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.email.fill('notValidEmailFormat');
        await textBox.submitBtn.click(); //this is needed to trigger validation
        const classAtr = await textBox.email.getAttribute('class');
        expect(classAtr.includes('field-error')).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.email.fill('rob@gmail.com');
        await textBox.submitBtn.click();
        await expect(textBox.output).toHaveText('Email:rob@gmail.com');
      });
    });
  });
  test.describe('LEVEL 6', () => {
    /*
        Level 6 Changes:
        1. Introducing Page Elements
        We treated email field as two separate fields (label and input) also getting placeholder and validation error was complicated
        We moved this into a  single Class (src/ui/po/elements/simple-input.el.ts)
        And using it as a single entity (src/ui/po/pages/text-box.po.ts) line 20.  Note: Check the selector
        Email field type is now SimpleInputEl
        Result: If we ever have another email field on a different page we will need to add it only once
        (it's a simple example with only 2 fields but Page Elements can have much more)

        NOTE: this emailEl element should actually just be called email.
        Please check code have changed
        We are now using emailEl.getPlaceholder() and emailEl.isErrorShown()
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      await textBox.userName.fill('Robert');
      await textBox.emailEl.fill('rob@gmail.com'); //changed to emailEl and now it uses .fill() wrapper
      await textBox.curAddress.fill('str1');
      await textBox.perAddress.fill('str2');
      await textBox.submitBtn.click();
      //checking
      await expect(textBox.output).toHaveText('Name:RobertEmail:rob@gmail.comCurrent Address :str1 Permananet Address :str2');
    });
    test('Email field checks', async ({ textBox }) => {
      //we can combine Label + Placeholder checks into a single step
      await test.step('checking if field name and Placeholder is correct', async () => {
        await expect(textBox.emailEl.label).toHaveText('Email');
        expect(await textBox.emailEl.getPlaceholder()).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.emailEl.fill('notValidEmailFormat'); //now using email.fill() wrapper
        await textBox.submitBtn.click(); //this is needed to trigger validation
        //changes here as well
        expect(await textBox.emailEl.isErrorShown()).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.emailEl.fill('rob@gmail.com');
        await textBox.submitBtn.click();
        await expect(textBox.output).toHaveText('Email:rob@gmail.com');
      });
    });
  });
  test.describe('LEVEL 6.1', () => {
    /*
        Level 6.1 Changes:
        1. One more Page Element Example
        Here we are adding one more element: OutputEl
        Helps to get 'expect-checks' look better and be more readable.
        Also, it gives a clear visible link between the data we put in and expect to get.
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      await textBox.userName.fill('Robert');
      await textBox.emailEl.fill('rob@gmail.com'); //changed to emailEl and now it uses .fill() wrapper
      await textBox.curAddress.fill('str1');
      await textBox.perAddress.fill('str2');
      await textBox.submitBtn.click();

      //by adding the Output Element we now can see a clear connection between data put in/out.
      await expect.soft(textBox.outputEl.name).toContainText('Robert');
      await expect.soft(textBox.outputEl.email).toContainText('rob@gmail.com');
      await expect.soft(textBox.outputEl.curAddress).toContainText('str1');
      await expect.soft(textBox.outputEl.perAddress).toContainText('str2');
      //also we change expect to expect.soft (this keeps the test running if the first expect fails)
    });
    test('Email field checks', async ({ textBox }) => {
      await test.step('checking if field name and Placeholder is correct', async () => {
        await expect(textBox.emailEl.label).toHaveText('Email');
        expect(await textBox.emailEl.getPlaceholder()).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.emailEl.fill('notValidEmailFormat');
        await textBox.submitBtn.click(); //this is needed to trigger validation

        expect(await textBox.emailEl.isErrorShown()).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.emailEl.fill('rob@gmail.com');
        await textBox.submitBtn.click();
        await expect(textBox.outputEl.email).toContainText('rob@gmail.com');
      });
    });
  });
  test.describe('LEVEL 7', () => {
    /*
        Level 7 Changes:
        1. Common functionality grouping.
        So far we were filling out the fields one by one.
        We can group common actions into a single functions `addFormData()`
        This function takes 4 arguments: name + email + curAdr + perAdr
        Result: It really helps the re-usability, since we might have a lot of similar tests that require same setup.
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      //changes are here (now we can pass the User Data in one line of code)
      //It's not ideal since some functions will need more than 4 arguments...
      await textBox.addFormData('Robert', 'rob@gmail.com', 'str1', 'str2');
      await textBox.submitBtn.click();

      await expect(textBox.outputEl.name).toContainText('Robert');
      await expect(textBox.outputEl.email).toContainText('rob@gmail.com');
      await expect(textBox.outputEl.curAddress).toContainText('str1');
      await expect(textBox.outputEl.perAddress).toContainText('str2');
    });
    test('Email field checks', async ({ textBox }) => {
      await test.step('checking if field name and Placeholder is correct', async () => {
        await expect(textBox.emailEl.label).toHaveText('Email');
        expect(await textBox.emailEl.getPlaceholder()).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.emailEl.fill('notValidEmailFormat');
        await textBox.submitBtn.click(); //this is needed to trigger validation
        expect(await textBox.emailEl.isErrorShown()).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.emailEl.fill('rob@gmail.com');
        await textBox.submitBtn.click();
        await expect(textBox.outputEl.email).toContainText('rob@gmail.com');
      });
    });
  });
  test.describe('LEVEL 8', () => {
    /*
        Level 8*:
        Some Dark magic will happen here it's a bit on a complicated side, brace yourself.

        Changes:
        a) Created a new interface/type to group the arguments. (src/ui/interfaces/example.int.ts) UserFormData
        b) Created a UserData file to store user data (src/ui/data/example.data.ts) of a newly created type UserFormData
        c) A new function fillFormWith() that takes only one argument of a type UserFormData

        What was accomplished with this:
        a) We have single function that accepts only 1 argument.( this argument is of type we just created UserFormData)
        In this case we lowered the count from 4 arguments to one. But it might have been 15 fields.(if form has more fields)
        b) We created an instant of actual User. We can have multiple users for different use cases.
        c) The function is now working with optional fields (imagine some fields are mandatory and some are not)

        Examples for better understanding:
        a) We create a new dish type called Pizza.
        It's mandatory to have round dough, other ingredients like pineapple are optional.
        But all options are defined. We have a list of possible ingredients.(pineapple, olives, chase etc)
        b) Here we are creating an Actual Pizza. For example Peperoni Pizza where we define what ingredients it actually has.
        c) Here we created a shortcut function.
        Instead of ordering pizza with: Tomatoes, Cheese, Olives, Peperoni
        We now simply order: Peperoni pizza
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      //check the code of this function
      await textBox.fillFormWith(USER_0_DATA);
      await textBox.submitBtn.click();

      await expect(textBox.outputEl.name).toContainText(USER_0_DATA.name);
      await expect(textBox.outputEl.email).toContainText(USER_0_DATA.email);
      await expect(textBox.outputEl.curAddress).toContainText(USER_0_DATA.curAdr);
      await expect(textBox.outputEl.perAddress).toContainText(USER_0_DATA.permAdr);
      //also we went from .toHaveText to .toContainText
      //in this test we are not testing the names/labels of the output
    });
    test('Email field checks', async ({ textBox }) => {
      await test.step('checking if field name and Placeholder is correct', async () => {
        await expect(textBox.emailEl.label).toHaveText('Email');
        expect(await textBox.emailEl.getPlaceholder()).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.emailEl.fill('notValidEmailFormat');
        await textBox.submitBtn.click(); //this is needed to trigger validation
        expect(await textBox.emailEl.isErrorShown()).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.emailEl.fill(USER_0_DATA.email);
        await textBox.submitBtn.click();
        await expect(textBox.outputEl.email).toContainText(USER_0_DATA.email);
      });
    });
  });
  test.describe('LEVEL 9', () => {
    /*
        Level 9:
        We would like to group the expects/checks the same way.
        We want to have a good link between the data we put in and expect out.
        This is why we will create a function getData() that will return an object of a type UserFormData
        And we can just compare it...
        */

    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    test('Fill out ALL the form', async ({ textBox }) => {
      await textBox.fillFormWith(USER_0_DATA);
      await textBox.submitBtn.click();
      //check the implementation of getData()
      expect(await textBox.outputEl.getData()).toEqual(USER_0_DATA);
    });

    test('Email field checks', async ({ textBox }) => {
      await test.step('checking if field name and Placeholder is correct', async () => {
        await expect(textBox.emailEl.label).toHaveText('Email');
        expect(await textBox.emailEl.getPlaceholder()).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.emailEl.fill('notValidEmailFormat');
        await textBox.submitBtn.click();
        expect(await textBox.emailEl.isErrorShown()).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.emailEl.fill(USER_0_DATA.email);
        await textBox.submitBtn.click();
        await expect(textBox.outputEl.email).toContainText(USER_0_DATA.email);
      });
    });
  });
  test.describe('LEVEL 10', () => {
    /*
        Level 10:
        Lets add some Data Driven tests into the mix
        Since we already have a nice correlation/link between input and output we can start using it.
        "Filling the Form test" will actually run couple times depending on how long the user list is.
        More Details: https://playwright.dev/docs/test-parameterize
        */
    test.beforeEach(async ({ textBox }) => {
      await textBox.visit();
    });
    //check out this loop
    //test name should be unique for each test (sometimes we might want to use indexes if we don't have unique attributes)
    //note: notice we are not using regular "quotes" but back `ticks`
    for (const user of USERS_LIST) {
      test(`Fill out ALL the form for ${user.name}`, async ({ textBox }) => {
        await textBox.fillFormWith(user);
        await textBox.submitBtn.click();
        expect(await textBox.outputEl.getData()).toEqual(user);
      });
    }

    test('Email field checks', async ({ textBox }) => {
      await test.step('checking if field name and Placeholder is correct', async () => {
        await expect(textBox.emailEl.label).toHaveText('Email');
        expect(await textBox.emailEl.getPlaceholder()).toEqual('name@example.com');
      });
      await test.step('checking field validation', async () => {
        await textBox.emailEl.fill('notValidEmailFormat');
        await textBox.submitBtn.click();
        expect(await textBox.emailEl.isErrorShown()).toEqual(true);
      });
      await test.step('checking the output', async () => {
        await textBox.emailEl.fill(USER_0_DATA.email);
        await textBox.submitBtn.click();
        await expect(textBox.outputEl.email).toContainText(USER_0_DATA.email);
      });
    });
  });
});
